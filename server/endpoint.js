import { Router } from 'express';

import UserRoute from './components/User/User.route.js';

const router = new Router();

router.use('/user', [UserRoute]);

export default router;
