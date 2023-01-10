import {
  body, validationResult
} from 'express-validator';
import APIError from '../../utils/APIError.js';

export function validateHandler(req, res, next) {
    const result = validationResult(req).array();
    if (!result.length) return next();

    return next(new APIError(400, result));
}

export const rsaDepositValidator = [
    body('data.fromAccountNumber').notEmpty().withMessage('fromAccountNumber value must not be empty'),
    body('data.fromAccountOwnerName').notEmpty().withMessage('fromAccountOwnerName value must not be empty'),
    body('data.bankCode').notEmpty().withMessage('bankCode value must not be empty'),
    body('data.toAccountNumber').notEmpty().withMessage('toAccountNumber value must not be empty'),
    body('data.toAccountOwnerName').notEmpty().withMessage('toAccountOwnerName value must not be empty'),
    body('data.amount').notEmpty().withMessage('amount value must not be empty'),
    body('data.amount').isInt().withMessage('amount must be a number'),
    body('data.fee').notEmpty().withMessage('fee value must not be empty'),
    body('data.fee').isInt().withMessage('fee must be a number'),
    body('data.content').notEmpty().withMessage('content value must not be empty'),
    body('signature').notEmpty().withMessage('content value must not be empty'),
    body('publicKey').notEmpty().withMessage('content value must not be empty'),
    validateHandler
];

export const rsaTransferValidator = [
    body('fromAccountNumber').notEmpty().withMessage('fromAccountNumber value must not be empty'),
    body('fromAccountOwnerName').notEmpty().withMessage('fromAccountOwnerName value must not be empty'),
    body('toAccountNumber').notEmpty().withMessage('toAccountNumber value must not be empty'),
    body('toAccountOwnerName').notEmpty().withMessage('toAccountOwnerName value must not be empty'),
    body('bankCode').notEmpty().withMessage('amount value must not be empty'),
    body('amount').notEmpty().withMessage('amount value must not be empty'),
    body('amount').isInt().withMessage('amount must be a number'),
    body('fee').notEmpty().withMessage('fee value must not be empty'),
    body('fee').isInt().withMessage('fee must be a number'),
    body('content').notEmpty().withMessage('content value must not be empty'),
    validateHandler
];
