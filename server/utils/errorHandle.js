import logger from '../logger.js';

export default function (error, req, res, next) {
  if (!error.statusCode) {
    logger.error(error.stack);
  }
  const status = error.statusCode || error.status || 500;
  const payload = error.message || error.errors || 'Internal server error';

  res.status(status).json({
    success: false,
    error: {
      code: status,
      message: payload
    }
  });
}
/*
* {
*   "success": false,
*   "error": {
*     "code": 401,
*     "message": "Token invalid"
*   }
* }
* */
