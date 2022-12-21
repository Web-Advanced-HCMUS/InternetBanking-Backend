import nodemailer from 'nodemailer';

const { EMAIL_ACCOUNT, EMAIL_APP_PASS } = process.env;

export const nodeMailerSendEmail = async (username, to, cc, subject, html, attachments) => {
  try {
    const transportSMTP = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_APP_PASS
      },
      tls: { rejectUnauthorized: false }
    });
    const mailConfig = {
      from: username,
      to,
      cc,
      subject,
      html
    };
    if (attachments) {
      mailConfig.attachments = attachments;
    }
    await transportSMTP.sendMail(mailConfig);
    return true;
  } catch (error) {
    return error;
  }
};
