import jwt from 'jsonwebtoken';

import APIError from '../utils/APIError.js';

import UserLoginModel from '../components/model/UserLogin.model.js';

const { ACCESS_KEY } = process.env;

export function authorized() {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (typeof authorization !== 'string') {
      return next(
        new APIError(401, { access: false, message: 'Unauthorized' })
      );
    }
    const authArray = authorization.split(' ');
    if (authArray[0] === 'Bearer') {
      const userToken = authArray[1];
      let userData;
      try {
        userData = jwt.verify(userToken, ACCESS_KEY);
      } catch (error) {
        return next(
          new APIError(401, { access: false, message: 'Unauthorized' })
        );
      }

      const user = await UserLoginModel.findOne({ username: userData?.username }).populate('userId').lean();
      const authUser = {
        _id: user?._id,
        username: user?.username,
        role: user?.userId?.role
      };

      req.auth = authUser;
      if (!req.auth) {
        return next(
          new APIError(401, { access: false, message: 'Unauthorized' })
        );
      }
      return next();
    }
    return next(new APIError(401, { access: false, message: 'Unauthorized' }));
  };
}

export function isAdmin() {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    if (typeof authorization !== 'string') {
      return next(
        new APIError(401, { access: false, message: 'Unauthorized' })
      );
    }
    const authArray = authorization.split(' ');
    if (authArray[0] === 'Bearer') {
      const userToken = authArray[1];
      let userData;
      try {
        userData = jwt.verify(userToken, ACCESS_KEY);
      } catch (error) {
        return next(
          new APIError(401, { access: false, message: 'Unauthorized' })
        );
      }

      const user = await UserLoginModel.findOne({ username: userData?.username }).populate('userId').lean();
      const authUser = {
        _id: user?._id,
        username: user?.username,
        role: user?.userId?.role
      };

      req.auth = authUser;
      if (!req.auth) {
        return next(
          new APIError(401, { access: false, message: 'Unauthorized' })
        );
      }
      if (req.auth?.role !== 'ADMIN') {
        return next(
          new APIError(403, { access: false, message: 'Forbidden!' })
        );
      }
      return next();
    }
    return next(new APIError(401, { access: false, message: 'Unauthorized' }));
  };
}
