import { validationResult } from 'express-validator';
import logger from '../logger.js';

/**
 * @swagger
 * definitions:
 *   ValidatorErrorItem:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *         description: The value got on request
 *       msg:
 *         type: string
 *         description: The error message
 *       param:
 *         type: string
 *         description: The key of value
 *       location:
 *         type: string
 *         description: The location of value
 */

/**
 * @swagger
 * definitions:
 *   ValidatorError:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *       errors:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             ref: "#/definitions/ValidatorErrorItem"
 *     example: {
 *        success: false
 *     }
 */

 export default function validatorErrorHandler(req, res, next) {
  // Finds the validation errors in this request
  // and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const arrayErrors = Object.values(errors.mapped());
    arrayErrors.forEach((error) => {
      const msg = error.msg[0];
      if (typeof msg === 'string') {
        error.msg = error.msg;
      } else if (msg instanceof Array) {
        try {
          error.msg = error.msg;
        } catch (e) {
          logger('validatorErrorHandler set language failed:');
          logger(error.msg);
          logger(e);
        }
      }
      error.msg = error.msg;
    });
    return res.status(422).json({
      success: false,
      errors: arrayErrors
    });
  }
  return next();
}
