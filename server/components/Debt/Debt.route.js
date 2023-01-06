import { Router } from 'express';
import * as DebtController from './Debt.controller.js';
import {
 getDebtListValidator, payDebtValidator, createDebtValidator, cancelDebtValidator
} from './Debt.validator.js';

const router = new Router();

router.get('/debt-list/:accountNumber', getDebtListValidator, DebtController.getDebtList);
router.post('/create-debt', createDebtValidator, DebtController.createDebt);
router.put('/request-cancel-debt/:debtId', cancelDebtValidator, DebtController.requestCancelDebt);
router.post('/pay-debt/:debtId', payDebtValidator, DebtController.payDebt);

export default router;
