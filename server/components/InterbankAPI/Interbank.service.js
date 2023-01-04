import * as crypto from 'crypto';
import md5 from 'md5';
import { errorMessage } from '../../utils/error.js';
import InterbankModel from '../model/InterBank.model.js';
import AccountModel from '../model/Account.model.js';
import APIError from '../../utils/APIError.js';
import { HandleRequest } from '../../utils/HandleRequest.js';

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

export function verifySignature(data, signature, publicKey) {
  try {
    const hashData = md5(getDataConfirmationString(data));

    const publicKeyObject = crypto.createPublicKey(publicKey);
    const verify = crypto.createVerify('SHA256');
    verify.update(hashData);
    verify.end();

    return verify.verify(publicKeyObject, Buffer.from(signature, 'base64'));
  } catch (error) {
    throw new APIError(401, error.message);
  }
}

export async function verifyInterbankDeposit(req) {
  try {
    const [err, validSignature] = await HandleRequest(verifySignature(req.body.data, req.body.signature, req.body.publicKey));
    if (err) throw new APIError(err.statusCode, err.message);
    if (!validSignature) throw new APIError(400, 'Signature is invalid');

    const validBank = await InterbankModel.findOne({
      code: req.body.data.bankCode
    });
    if (!validBank) throw new APIError(400, 'Bank does not be linked in system before');

    const validAccount = await AccountModel.findOne({
      accountNumber: req.body.data.toAccountNumber,
      accountOwnerName: req.body.data.toAccountOwnerName
    });
    if (!validAccount) throw new APIError(400, 'Beneficiary does not exist in system');

    return req.body;
  } catch (error) {
    console.log(error);
    throw new APIError(error.statusCode || error.code || 500, error.message);
  }
}

export async function getSignature(data, privateKey) {
  try {
    console.log(getDataConfirmationString(data))
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
