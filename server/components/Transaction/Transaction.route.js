import { Router } from 'express';
import * as TransactionController from './Transaction.controller.js';
import { internalTransactionValidator } from './Transaction.validator.js';

const router = new Router();

router.get('/get-transactions/:accountNumber', TransactionController.getListTransaction);
router.post('/internal-transfer', internalTransactionValidator, TransactionController.insertOneTransaction);

export default router;
