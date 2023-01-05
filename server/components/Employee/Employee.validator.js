import { body } from 'express-validator';

import validatorErrorHandler from '../../utils/validatorErrorHandle.js';

export const getRechargeInfoValidator = [
  body('userInfo').isString().notEmpty().withMessage('Account Number or Username must be String!'),
  body('amount').isNumeric().withMessage('Money amount must be Number!'),
  validatorErrorHandler
];
