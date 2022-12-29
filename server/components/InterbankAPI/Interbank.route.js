import { Router } from 'express';
import * as InterbankController from './Interbank.controller.js';
import { verifyTokenUsingSecretKey } from '../../helper/authorize.mdw.js';

const router = new Router();

router.post('/deposit', InterbankController.deposit);

router.get('/generate-key-pair', InterbankController.getKeyPair);
router.post('/sign', InterbankController.sign);
router.post('/verify-signature', InterbankController.verifySignature);

export default router;
