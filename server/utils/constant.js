import dotenv from "dotenv";
dotenv.config();

export const USER_ROLE = {
  CLIENT: 'customer',
  ADMIN: 'admin'
};

export const USER_MODEL_TYPE = {
  USER: 'UserInfo',
  EMPLOYEE: 'Employee'
};

export const USER_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  ELSE: 'else'
};

export const DEBT_STATUS = {
  INCOMPLETE: 'incomplete',
  COMPLETE: 'complete'
};

export const DEBT_TYPE = {
  CREDITOR: 'creditor',
  DEBTOR: 'debtor'
};

export const TRANSFER_TYPE = {
  INTERNAL: 'internal',
  INTERBANK: 'interbank'
};

export const TRANSACTION_TYPE = {
  DEPOSIT: 'deposit',
  RECEIVE_TRANSFER: 'receive-transfer',
  SPEND_TRANSFER: 'spend-transfer',
  PAY_DEBT: 'pay-debt',
  RECEIVE_DEBT_PAYMENT: 'receive-debt-payment'
};

export const FEE_PAID_TYPE = {
  PAID_SENDER: 'paid sender',
  PAID_RECEIVER: 'paid receiver'
};

export const ACCOUNT_TYPE = {
  PAYMENT: 'payment',
  SAVING: 'saving'
};

export const OTP_STATUS = {
  PENDING: 'pending',
  CONFIRM: 'confirmed'
};

export const mail = {
  MAILING_SERVICE_CLIENT_ID: process.env.MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET: process.env.MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
};
