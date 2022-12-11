import { body } from 'express-validator';
import validatorErrorHandler from '../../utils/validatorErrorHandle.js';

import { USER_ROLE, USER_GENDER } from '../../utils/constant.js';

export const getUserPassValidator = [
  body('username').isString().notEmpty().withMessage('Username must be String!'),
  body('password').isHash().withMessage('Password must be hashed String'),
  validatorErrorHandler
];

export const getUserInfoValidator = [
  body('fullName').isString().withMessage('Name must be String!'),
  body('role').isIn(Object.keys(USER_ROLE)).withMessage('Invalid User Role!'),
  body('gender').isIn(Object.keys(USER_GENDER)).withMessage(`User gender must in: ${Object.keys(USER_GENDER)}!`),
  body('phone').isMobilePhone().withMessage('Invalid Phone number!'),
  body('dateOfBirth').isDate().withMessage('Invalid Date!'),
  body('email').isEmail().withMessage('Invalid Email!'),
  body('identityCard').isIdentityCard().withMessage('Invalid Identity ID!'),
  body('address').isString().notEmpty().withMessage('Address must be String!'),
  validatorErrorHandler
];
