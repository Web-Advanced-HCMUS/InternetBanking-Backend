import { Router } from 'express';
import BeneficiaryRouter from './components/Beneficiary/Beneficiary.route.js';

import UserRoute from './components/User/User.route.js';

const router = new Router();

router.use('/user', [UserRoute]);

router.use('/api/beneficiary', BeneficiaryRouter);

export default router;
