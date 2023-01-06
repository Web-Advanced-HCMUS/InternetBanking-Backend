import {
    body, param, query, validationResult
} from 'express-validator';
import APIError from '../../utils/APIError.js';

export function validateHandler(req, res, next) {
    const result = validationResult(req).array();
    if (!result.length) return next();

    return next(new APIError(400, result));
}

export const createDebtValidator = [
    body('creditorAccountNumber')
        .exists()
        .notEmpty()
        .withMessage('creditorAccountNumber value must not be empty'),
    body('debtorAccountNumber')
        .exists()
        .notEmpty()
        .withMessage('debtorAccountNumber value must be mongoDb format'),
    body('amountOwed')
        .exists()
        .notEmpty()
        .withMessage('amountOwed value must not be empty')
        .isInt()
        .withMessage('amountOwed value must be number'),
    body('content')
        .exists()
        .notEmpty()
        .withMessage('content value must not be empty'),
    body('startDate')
        .exists()
        .notEmpty()
        .withMessage('startDate value must not be empty')
        .isISO8601()
        .toDate()
        .withMessage('endDate value must be date format'),
    body('endDate')
        .exists()
        .notEmpty()
        .withMessage('endDate value must not be empty')
        .isISO8601()
        .toDate()
        .withMessage('endDate value must be date format'),
    validateHandler
];

export const payDebtValidator = [
    body('fromAccountNumber')
        .exists()
        .notEmpty()
        .withMessage('creditorAccountNumber value must not be empty'),
    body('content')
        .exists()
        .notEmpty()
        .withMessage('content value must not be empty'),
    body('userId')
        .exists()
        .notEmpty()
        .withMessage('userId value must not be empty')
        .isMongoId()
        .withMessage('userId value must be mongoDb id format'),
    body('otp')
        .exists()
        .notEmpty()
        .withMessage('otp value must not be empty'),
    validateHandler
];

export const cancelDebtValidator = [
    body('fromAccountNumber')
        .exists()
        .notEmpty()
        .withMessage('creditorAccountNumber value must not be empty'),
    body('content')
        .exists()
        .notEmpty()
        .withMessage('content value must not be empty'),
    validateHandler
];

export const getDebtListValidator = [
    query('debtType')
        .exists()
        .notEmpty()
        .withMessage('debtType value must not be empty')
        .isIn(['creditor', 'debtor', 'all'])
        .withMessage('debtType value must must in [\'creditor\', \'debtor\', \'all\']'),
    validateHandler
];
