import { Router } from 'express';
import * as OTPController from './OTP.controller.js';

const router = new Router();

router.post('/get-transaction-otp', OTPController.getTransactionOTP);

export default router;
