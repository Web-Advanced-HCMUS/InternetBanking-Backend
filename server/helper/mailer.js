// import nodemailer from "nodemailer";

// const { EMAIL_ACCOUNT, EMAIL_APP_PASS } = process.env;

// export const nodeMailerSendEmail = async (
//   username,
//   to,
//   cc,
//   subject,
//   html,
//   attachments
// ) => {
//   try {
//     const transportSMTP = nodemailer.createTransport({
//       service: "gmail",
//       host: "stmp.gmail.com",
//       secure: false,
//       auth: {
//         user: EMAIL_ACCOUNT,
//         pass: EMAIL_APP_PASS,
//       },
//       tls: { rejectUnauthorized: false },
//     });
//     const mailConfig = {
//       from: username,
//       to,
//       cc,
//       subject,
//       html,
//     };
//     if (attachments) {
//       mailConfig.attachments = attachments;
//     }
//     await transportSMTP.sendMail(mailConfig);
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

import nodemailer from "nodemailer";
import { google } from "googleapis";
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
import { mail } from "../utils/constant.js";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = mail;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail
export const nodeMailerSendEmail = async (
  to,
  subject,
  cc,
  html,
  attachments
) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailConfig = {
    from: SENDER_EMAIL_ADDRESS,
    to,
    cc,
    subject,
    html,
  };
  if (attachments) {
    mailConfig.attachments = attachments;
  }

  await smtpTransport.sendMail(mailConfig, (err, infor) => {
    if (err) return err;
    return infor;
  });
};
