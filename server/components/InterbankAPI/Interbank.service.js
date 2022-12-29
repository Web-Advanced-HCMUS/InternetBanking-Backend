import * as crypto from 'crypto';
import sha256 from 'sha256';
import { errorMessage } from '../../utils/error.js';
import InterBankModel from '../model/InterBank.model.js';
import * as TransactionService from '../Transaction/Transaction.service.js';
import AccountModel from '../model/Account.model.js';
import InterbankModel from '../model/InterBank.model.js';
import APIError from "../../utils/APIError.js";

export async function verifyInterbankDeposit(req, next) {
  try {
    const validSignature = verifySignature(req.body.data, req.body.signature, req.body.publicKey, next);

    if (!validSignature) return errorMessage(405, 'Signature is invalid');

    const validBank = await InterbankModel.findOne({
      code: req.body.data.bankCode
    });
    if (!validBank) return errorMessage(405, 'Bank does not be linked in system before');

    const validAccount = await AccountModel.findOne({
      accountNumber: req.body.data.toAccountNumber,
      accountOwnerName: req.body.data.toAccountOwnerName
    });
    if (!validAccount) return errorMessage(405, 'Target account number does not exist in system');

    return req.body;
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function verifySignature(data, signature, publicKey, next) {
  try {
    const hashData = sha256(JSON.stringify(data));

    const publicKeyObject = crypto.createPublicKey(publicKey);
    const verify = crypto.createVerify('SHA256');
    verify.update(hashData);
    verify.end();

    return verify.verify(publicKeyObject, Buffer.from(signature, 'base64'));
  } catch (error) {
    //next({...error, message: "Can't verify signature, check your key or data"});
    return errorMessage(400, error);
  }
}

export async function getSignature(data, privateKey) {
  try {
    const hashData = sha256(JSON.stringify(data));

    const privateKeyObject = crypto.createPrivateKey(privateKey);

    const sign = crypto.createSign('SHA256');
    sign.update(hashData);
    sign.end();

    const signature = sign.sign(privateKeyObject).toString('base64');

    return { signature };
  } catch (error) {
    return errorMessage(500, error);
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
