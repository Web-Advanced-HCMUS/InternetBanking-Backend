import { Router } from 'express';
import * as InterbankController from './Interbank.controller.js';
import { verifyTokenUsingSecretKey } from '../../helper/authorize.mdw.js';
import { rsaDepositValidator } from './Interbank.validator.js';

const router = new Router();

router.post('/rsa-deposit', verifyTokenUsingSecretKey(), rsaDepositValidator, InterbankController.rsaDeposit);
router.post('/pgp-deposit', verifyTokenUsingSecretKey());
router.get('/get-account/:accountNumber', verifyTokenUsingSecretKey(), InterbankController.getAccount);

router.get('/generate-key-pair', InterbankController.getKeyPair);
router.post('/sign', InterbankController.sign);
router.post('/verify-signature', InterbankController.verifySignature);

export default router;
