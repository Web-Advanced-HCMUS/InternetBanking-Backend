export const USER_ROLE = {
  CLIENT: 'CLIENT',
  EMPLOYEE: 'EMPLOYEE',
  ADMIN: 'ADMIN'
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
  COMPLETE: 'complete',
  CANCEL: 'cancel'
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
  INTERNAL_TRANSFER: 'internal-transfer',
  INTERBANK_TRANSFER: 'interbank-transfer',
  PAY_DEBT: 'pay-debt',
  RECHARGE: 'RECHARGE'
};

export const TRANSACTION_STATUS = {
  FAIL: 'fail',
  PENDING: 'pending',
  SUCCESS: 'success'
};

export const FEE_PAID_TYPE = {
  PAID_SENDER: 'paid sender',
  PAID_RECEIVER: 'paid receiver',
  NO: 'no'
};

export const ACCOUNT_TYPE = {
  PAYMENT: 'payment',
  SAVING: 'saving'
};

export const OTP_STATUS = {
  PENDING: 'pending',
  CONFIRM: 'confirmed'
};

export const BANK_CODE = {
  MY_BANK: 'TIMO_CLONE'
};

export const mail = {
  MAILING_SERVICE_CLIENT_ID: process.env.MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET: process.env.MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
};
