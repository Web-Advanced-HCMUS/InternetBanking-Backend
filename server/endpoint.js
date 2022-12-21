import { Router } from 'express';
import BeneficiaryRouter from './components/Beneficiary/Beneficiary.route.js';
import TransactionRouter from './components/Transaction/Transaction.route.js';

import UserRoute from './components/User/User.route.js';

const router = new Router();

router.use('/user', [UserRoute]);
router.use('/api/beneficiary', BeneficiaryRouter);
router.use('/api/transaction', TransactionRouter);

export default router;
