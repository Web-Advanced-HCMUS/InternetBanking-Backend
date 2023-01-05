import { body } from 'express-validator';

import { ACCOUNT_TYPE } from '../../utils/constant.js';

import validatorErrorHandler from '../../utils/validatorErrorHandle.js';

export const getRechargeInfoValidator = [
  body('userInfo').isString().notEmpty().withMessage('Account Number or Username must be String!'),
  body('amount').isNumeric().withMessage('Money amount must be Number!'),
  validatorErrorHandler
];

export const addAccountValidator = [
  body('identityCard').isString().notEmpty().withMessage('Identity must be String!'),
  body('accountType').isIn(Object.keys(ACCOUNT_TYPE)).withMessage(`Type must be one of ${Object.keys(ACCOUNT_TYPE).join(', ')}`),
  validatorErrorHandler
];
