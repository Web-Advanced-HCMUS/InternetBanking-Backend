import APIError from './APIError.js';

export function errorMessage(code, message) {
  // return Promise.reject(new APIError(code, message));
  console.log(message);
  return Promise.reject(new APIError(code, { message }));
}
