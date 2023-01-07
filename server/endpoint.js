import { Router } from 'express';

import BeneficiaryRouter from './components/Beneficiary/Beneficiary.route.js';
import TransactionRouter from './components/Transaction/Transaction.route.js';
import InterbankRouter from './components/InterbankAPI/Interbank.route.js';
import OTPRouter from './components/OTP/OTP.route.js';
import AccountRouter from './components/Account/Account.route.js';
import UserRoute from './components/User/User.route.js';
import EmployeeRoute from './components/Employee/Employee.route.js';
import AdminRoute from './components/Admin/Admin.route.js';
import DebtRouter from './components/Debt/Debt.route.js';

const router = new Router();

router.use('/user', [UserRoute]);

router.use('/emp', [EmployeeRoute]);

router.use('/admin', [AdminRoute]);

router.use('/api/beneficiary', BeneficiaryRouter);

router.use('/api/transaction', TransactionRouter);

router.use('/api/interbank', InterbankRouter);

router.use('/api/account', AccountRouter);

router.use('/api/otp', OTPRouter);

router.use('/api/debt', DebtRouter);

export default router;
