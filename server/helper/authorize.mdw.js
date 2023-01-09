import jwt from "jsonwebtoken";

import APIError from "../utils/APIError.js";

import UserLoginModel from "../components/model/UserLogin.model.js";
import InterbankModel from "../components/model/InterBank.model.js";

import { genHmac } from "./signHmac.js";
import { USER_MODEL_TYPE } from "../utils/constant.js";

const { ACCESS_KEY, REFRESH_KEY, TIME_EXPIRED } = process.env;

export function authorized() {
  return async (req, res, next) => {
    const authorization = req.header("Authorization");
    if (typeof authorization !== "string") {
      return next(
        new APIError(401, { access: false, message: "Unauthorized" })
      );
    }
    const authArray = authorization.split(" ");
    if (authArray[0] === "Bearer") {
      const userToken = authArray[1];
      let userData;
      try {
        userData = jwt.verify(userToken, REFRESH_KEY);
      } catch (error) {
        return next(
          new APIError(401, { access: false, message: "Unauthorized" })
        );
      }

      const user = await UserLoginModel.findOne({
        userId: userData?.userID,
      })
        .populate("userId")
        .lean();
      const authUser = {
        userId: user?.userId,
      };
      console.log(authUser);

      req.auth = authUser;
      if (!req.auth) {
        return next(
          new APIError(401, { access: false, message: "Unauthorized" })
        );
      }

      return next();
    }
    return next(new APIError(401, { access: false, message: "Unauthorized" }));
  };
}

export function isAdmin() {
  return async (req, res, next) => {
    const authorization = req.header("Authorization");
    if (typeof authorization !== "string") {
      return next(
        new APIError(401, { access: false, message: "Unauthorized" })
      );
    }
    const authArray = authorization.split(" ");
    if (authArray[0] === "Bearer") {
      const userToken = authArray[1];
      let userData;
      try {
        userData = jwt.verify(userToken, ACCESS_KEY);
      } catch (error) {
        return next(
          new APIError(401, { access: false, message: "Unauthorized" })
        );
      }

      const user = await UserLoginModel.findOne({
        username: userData?.username,
      })
        .populate("userId")
        .lean();
      if (user?.userInfoModel !== USER_MODEL_TYPE.EMPLOYEE) {
        return next(
          new APIError(403, { access: false, message: "Forbidden!" })
        );
      }
      const authUser = {
        _id: user?._id,
        username: user?.username,
        role: user?.userId?.role,
      };

      req.auth = authUser;
      if (!req.auth) {
        return next(
          new APIError(401, { access: false, message: "Unauthorized" })
        );
      }
      return next();
    }
    return next(new APIError(401, { access: false, message: "Unauthorized" }));
  };
}

export function verifyTokenUsingSecretKey() {
  return async (req, res, next) => {
    const { time, hmac, bankCode } = req.query;

    if (!time || !hmac || !bankCode) {
      return next(new APIError(400, "bad request"));
    }

    const differentTime = Math.floor(Date.now() - time);
    if (differentTime > TIME_EXPIRED) {
      return next(new APIError(401, "hmac token is expired"));
    }

    const { secretKey } = await InterbankModel.findOne({ code: bankCode });
    if (!secretKey) {
      return next(new APIError(401, "bank is not exist in system"));
    }

    const signServer = genHmac(req.query, secretKey);
    if (signServer !== hmac) {
      return next(new APIError(401, "hmac token is invalid"));
    }

    return next();
  };
}

export function isEmployee() {
  return async (req, res, next) => {
    const authorization = req.header("Authorization");
    if (typeof authorization !== "string") {
      return next(
        new APIError(401, { access: false, message: "Unauthorized" })
      );
    }
    const authArray = authorization.split(" ");
    if (authArray[0] === "Bearer") {
      const userToken = authArray[1];
      let userData;
      try {
        userData = jwt.verify(userToken, ACCESS_KEY);
      } catch (error) {
        return next(
          new APIError(401, { access: false, message: "Unauthorized" })
        );
      }

      const user = await UserLoginModel.findOne({
        username: userData?.username,
      }).lean();
      const authUser = {
        _id: user?._id,
        username: user?.username,
        role: user?.userId?.role,
      };

      req.auth = authUser;
      if (!req.auth) {
        return next(
          new APIError(401, { access: false, message: "Unauthorized" })
        );
      }
      if (req.auth?.role !== "ADMIN") {
        return next(
          new APIError(403, { access: false, message: "Forbidden!" })
        );
      }
      return next();
    }
    return next(new APIError(401, { access: false, message: "Unauthorized" }));
  };
}
