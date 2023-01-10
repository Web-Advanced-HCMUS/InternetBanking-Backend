import * as crypto from 'crypto';
import md5 from 'md5';
import axios from 'axios';
import { errorMessage } from '../../utils/error.js';
import InterbankModel from '../model/InterBank.model.js';
import AccountModel from '../model/Account.model.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';
import * as OTPService from '../OTP/OTP.service.js';
import * as AccountService from '../Account/Account.service.js';
import { BANK_CODE, FEE_PAID_TYPE, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../../utils/constant.js';
import { genHmacVerifyExternalCall, genHmacSWENBank } from '../../helper/signHmac.js';

function getDataConfirmationString(data) {
  const keys = ['bankCode', 'transactionType', 'amount', 'fee', 'content', 'time', 'status'];
  const sortKeys = [];
  for (const key in data) {
    if (keys.includes(key)) {
      sortKeys.push(key);
    }
  }

  sortKeys.sort();

  const keyValues = [];

  sortKeys.forEach((key) => {
    keyValues.push(`${key}=${data[key]}`);
  });

  return keyValues.join('&').toString();
}

export async function getSWENSignature(data, privateKey) {
  try {
    const privateKeyObject = crypto.createPrivateKey(privateKey);

    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(data));
    sign.end();

    return sign.sign(privateKeyObject).toString('base64');
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function getSignature(data, privateKey) {
  try {
    const hashData = md5(getDataConfirmationString(data));

    const privateKeyObject = crypto.createPrivateKey(privateKey);

    const sign = crypto.createSign('SHA256');
    sign.update(hashData);
    sign.end();

    return sign.sign(privateKeyObject).toString('base64');
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export function verifySWENSignature(data, signature, publicKey) {
  try {
    const publicKeyObject = crypto.createPublicKey(publicKey);
    const verify = crypto.createVerify('SHA256');
    verify.update(data);
    verify.end();

    return verify.verify(publicKeyObject, Buffer.from(signature, 'base64'));
  } catch (error) {
    throw new APIError(400, error.message);
  }
}

export function verifySignature(data, signature, publicKey) {
  try {
    const hashData = md5(getDataConfirmationString(data));

    const publicKeyObject = crypto.createPublicKey(publicKey);
    const verify = crypto.createVerify('SHA256');
    verify.update(hashData);
    verify.end();

    return verify.verify(publicKeyObject, Buffer.from(signature, 'base64'));
  } catch (error) {
    throw new APIError(400, error.message);
  }
}

export async function acceptInterbankTransaction(data) {
  try {
    const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

    const [err2, serverSign] = await HandleRequest(getSWENSignature(data, privateKey));
    if (err2) throw new APIError(err2.statusCode, err2.message);

    return {
      data,
      signature: serverSign,
      publicKey: process.env.PUBLIC_KEY.replace(/\\n/g, '\n')
    };
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function getAccount(accountNumber, externalBankCode) {
  try {
    const interBank = await InterbankModel.findOne({
      code: externalBankCode
    });
    if (!interBank) throw new APIError(400, 'Bank does not be linked in system before');

    const time = Date.now();
    const bankCode = BANK_CODE.MY_BANK;
    const hmac = genHmacSWENBank({ time, bankCode }, interBank.secretKey);

    const res = await axios.get('http://143.198.218.103:3030/Api/GetInformationAccount', {
      params: {
        time,
        bankCode,
        hmac,
        accountNumber
      }
    });

    if (res.data.status !== 'success') return new APIError(400, "Account number doesn't exist");

    return res.data.data;
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function makeTransferRequest(requestBody) {
  const data = {
    source_account_number: requestBody.fromAccountNumber,
    source_owner_name: requestBody.fromAccountOwnerName,
    destination_account_number: requestBody.toAccountNumber,
    destination_owner_name: requestBody.toAccountNumber,
    amount: requestBody.amount,
    fee: requestBody.fee,
    note: requestBody.content
  };

  const interBank = await InterbankModel.findOne({
    code: requestBody.bankCode
  });
  const signature = await getSWENSignature(data, process.env.PRIVATE_KEY.replace(/\\n/g, '\n'));

  const time = Date.now();
  const bankCode = BANK_CODE.MY_BANK;
  const hmac = genHmacSWENBank({ time, bankCode }, interBank.secretKey);

  const res = await axios.post('http://143.198.218.103:3030/Api/DepositAccount', { data, signature }, {
    params: {
      time,
      bankCode,
      hmac
    }
  });

  const [err, validSignature] = await HandleRequest(verifySWENSignature(JSON.stringify(res.data.data), res.data.signature, res.data.public_key));
  if (err) throw new APIError(err.statusCode, err.message);
  if (!validSignature) throw new APIError(400, 'Signature from interbank is invalid, cancel transaction');

  if (res.data.status !== 'success') return new APIError(200, 'Transfer fail');

  return {
    ...requestBody,
    status: TRANSACTION_STATUS.SUCCESS,
    interbankData: JSON.stringify(res.data.data).toString(),
    signature: res.data.signature
  };
}

export async function verifyInterbankTransfer(req) {
  try {
    const {
 userId, otp, fromAccountNumber, toAccountNumber, amount, fee, feePaymentMethod
} = req.body;

    const [err1, modifiedCount] = await HandleRequest(OTPService.verifyOTP(userId, otp));
    if (err1) throw new APIError(err1.statusCode, err1.message);
    if (modifiedCount === 0) throw new APIError(400, 'Error occur while verify OTP');

    const [err2, fromAccount] = await HandleRequest(AccountService.getAccount(fromAccountNumber));
    if (err2) throw new APIError(err2.statusCode, err2.message);
    if (!fromAccount) throw new APIError(400, 'Account operates transaction is not exist in system');

    const validBank = await InterbankModel.findOne({
      code: req.body.bankCode
    });
    if (!validBank) throw new APIError(400, 'Bank does not be linked in system before');

    const [err3, toAccount] = await HandleRequest(getAccount(toAccountNumber, req.body.bankCode));
    if (err3) throw new APIError(err3.statusCode, err3.message);
    if (toAccount.status === 'fail') throw new APIError(400, 'Beneficiary account is not exist in destination bank');
    if (toAccount.name !== req.body.toAccountOwnerName) throw new APIError(400, 'Beneficiary account owner name is not exist in destination bank');

    const senderFee = feePaymentMethod === FEE_PAID_TYPE.PAID_SENDER ? fee : 0;
    const [err4, isValidBalance] = await HandleRequest(AccountService.checkBalanceAfterSpend(fromAccountNumber, amount, senderFee));
    if (err4) throw new APIError(err4.statusCode, err4.message);
    if (!isValidBalance) throw new APIError(400, 'Your account does not have enough balance to make a transaction');

    return {
      ...req.body,
      transactionType: TRANSACTION_TYPE.INTERBANK_TRANSFER,
      bankCode: req.body.bankCode
    };
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function verifyInterbankDeposit(req) {
  try {
    const [err, validSignature] = await HandleRequest(verifySignature(req.body.data, req.body.signature, req.body.publicKey));
    if (err) throw new APIError(err.statusCode, err.message);
    if (!validSignature) throw new APIError(400, 'Signature is invalid');

    const validBank = await InterbankModel.findOne({
      bankCode: req.body.data.bankCode
    });
    if (!validBank) throw new APIError(400, 'Bank does not be linked in system before');

    const validAccount = await AccountModel.findOne({
      accountNumber: req.body.data.toAccountNumber
    });
    if (!validAccount) throw new APIError(400, 'Beneficiary does not exist in system');

    return req.body;
  } catch (error) {
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function getKeyPair() {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    return { publicKey, privateKey };
  } catch (error) {
    return errorMessage(500, error);
  }
}
