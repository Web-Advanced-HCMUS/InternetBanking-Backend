import {
  body, validationResult
} from 'express-validator';
import APIError from '../../utils/APIError.js';

export function validateHandler(req, res, next) {
    const result = validationResult(req).array();
    if (!result.length) return next();

    return next(new APIError(400, result));
}

export const internalTransactionValidator = [
    body('userId').notEmpty().withMessage('userId value must not be empty'),
    body('userId').isMongoId().withMessage('userId value must be mongoDb format'),
    body('otp').notEmpty().withMessage('otp value must not be empty'),
    body('fromAccountNumber').notEmpty().withMessage('fromAccountNumber value must not be empty'),
    body('feePaymentMethod').notEmpty().withMessage('feePaymentMethod value must not be empty'),
    body('toAccountNumber').notEmpty().withMessage('toAccountNumber value must not be empty'),
    body('amount').notEmpty().withMessage('amount value must not be empty'),
    body('amount').isInt().withMessage('amount must be a number'),
    body('fee').notEmpty().withMessage('fee value must not be empty'),
    body('fee').isInt().withMessage('fee must be a number'),
    body('content').notEmpty().withMessage('content value must not be empty'),
    validateHandler
];
