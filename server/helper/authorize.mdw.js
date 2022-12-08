import jwt from 'jsonwebtoken';

import APIError from '../utils/APIError.js';

const { ACCESS_KEY } = process.env;

export function authorized() {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (typeof authorization !== 'string') {
      return next(new APIError(401, { access: false, message: 'Unauthorized' }));
    }
    const authArray = authorization.split(' ');
    if (authArray[0] === 'Bearer') {
      const userToken = authArray[1];
      let userData;
      try {
        userData = jwt.verify(userToken, ACCESS_KEY);
      } catch (error) {
        return next(new APIError(401, { access: false, message: 'Unauthorized' }));
      }

      req.auth = userData;
      if (!req.auth) return next(new APIError(401, { access: false, message: 'Unauthorized' }));
      return next();
    }
    return next(new APIError(401, { access: false, message: 'Unauthorized' }));
  };
}
