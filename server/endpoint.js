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
import { authorized } from './helper/authorize.mdw.js';

const router = new Router();

router.use('/user', [UserRoute]);

router.use('/emp', [EmployeeRoute]);

router.use('/admin', [AdminRoute]);

router.use('/api/beneficiary', authorized(), BeneficiaryRouter);

router.use('/api/transaction', authorized(), TransactionRouter);

router.use('/api/interbank', authorized(), InterbankRouter);

router.use('/api/account', authorized(), AccountRouter);

router.use('/api/otp', authorized(), OTPRouter);

router.use('/api/debt', authorized(), DebtRouter);

export default router;
