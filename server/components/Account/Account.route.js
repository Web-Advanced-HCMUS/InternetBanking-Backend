import { Router } from 'express';
import * as AccountController from './Account.controller.js';

const router = new Router();

router.get('/get-one/:accountNumber', AccountController.getAccount);

router.get('/get-one-from-user/:userId', AccountController.getAccountFromUser);

export default router;
