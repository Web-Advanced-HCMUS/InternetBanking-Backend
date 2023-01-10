import { Router } from 'express';
import * as InterbankController from './Interbank.controller.js';
import { verifyTokenUsingSecretKey } from '../../helper/authorize.mdw.js';
import { rsaDepositValidator, rsaTransferValidator } from './Interbank.validator.js';

const router = new Router();

router.get('/get-account/:accountNumber', verifyTokenUsingSecretKey(), InterbankController.getAccount);
router.post('/rsa-deposit', verifyTokenUsingSecretKey(), rsaDepositValidator, InterbankController.rsaDeposit);

router.get('/get-account-external/:accountNumber', InterbankController.getAccountExternal);
router.post('/rsa-transfer', rsaTransferValidator, InterbankController.rsaTransfer);

router.get('/generate-key-pair', InterbankController.getKeyPair);
router.post('/sign', InterbankController.sign);
router.post('/verify-signature', InterbankController.verifySignature);

export default router;
