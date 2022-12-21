import dotenv from "dotenv";
dotenv.config();

export const USER_ROLE = {
  client: "CLIENT",
  admin: "ADMIN",
};

export const USER_GENDER = {
  male: "MALE",
  female: "FEMALE",
  else: "ELSE",
};

export const mail = {
  MAILING_SERVICE_CLIENT_ID: process.env.MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET: process.env.MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
};
