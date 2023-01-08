import { body, query } from "express-validator";
import validatorErrorHandler from "../../utils/validatorErrorHandle.js";

import { USER_ROLE, USER_GENDER } from "../../utils/constant.js";

export const getUserIdValidator = [
  query("userId").isMongoId().withMessage("User Id must be MongoId!"),
  validatorErrorHandler,
];

export const getUserPassValidator = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username must be String!"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password must be String!"),
  validatorErrorHandler,
];

export const getUserInfoValidator = [
  body("fullName").isString().withMessage("Name must be String!"),
  body("role").isIn(Object.keys(USER_ROLE)).withMessage("Invalid User Role!"),
  body("gender")
    .isIn(Object.keys(USER_GENDER))
    .withMessage(`User gender must in: ${Object.keys(USER_GENDER)}!`),
  body("phone").isMobilePhone().withMessage("Invalid Phone number!"),
  body("dateOfBirth").isDate().withMessage("Invalid Date!"),
  body("email").isEmail().withMessage("Invalid Email!"),
  body("identityCard").isString().withMessage("Invalid Identity ID!"),
  body("address").isString().notEmpty().withMessage("Address must be String!"),
  validatorErrorHandler,
];
