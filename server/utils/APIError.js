export default class APIError extends Error {
  constructor(statusCode, errors, ...args) {
    super(...args);
    Error.captureStackTrace(this, APIError);
    this.statusCode = statusCode;
    if (typeof errors === 'string') {
      this.message = errors;
    } else {
      this.errors = errors;
    }
  }
}
