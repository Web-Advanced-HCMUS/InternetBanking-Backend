import { Router } from 'express';
import * as OTPController from './OTP.controller.js';
import { OTPValidator } from './OTP.validator.js';

const router = new Router();

router.post('/get-transaction-otp', OTPValidator, OTPController.getTransactionOTP);

export default router;
