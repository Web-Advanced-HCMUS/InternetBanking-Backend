import { Router } from 'express';
import * as TransactionController from './Transaction.controller.js';

const router = new Router();

router.get('/get-transactions/:accountNumber', TransactionController.getListTransaction);
router.post('/get-otp', TransactionController.getOTP);
router.post('/internal-transfer', TransactionController.insertOneTransaction);

export default router;
