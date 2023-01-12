import { Router } from 'express';
import * as AccountController from './Account.controller.js';

const router = new Router();

router.get('/get-one/:accountNumber', AccountController.getAccount);
router.get('/get-list/:userId', AccountController.getAccountListFromUser);
router.get('/get-payment/:userId', AccountController.getPaymentAccountFromUser);

export default router;
