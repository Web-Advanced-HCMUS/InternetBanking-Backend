import { body, validationResult } from 'express-validator';
import APIError from '../../utils/APIError.js';

export function validateHandler(req, res, next) {
    const result = validationResult(req).array();
    if (!result.length) return next();

    return next(new APIError(400, result));
}

export const OTPValidator = [
        body('userId').isMongoId().notEmpty(),
        body('amount').isInt().notEmpty(),
        validateHandler
];
