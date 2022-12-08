import nodemailer from 'nodemailer';

export const nodeMailerSendEmail = async (username, password, to, cc, subject, html, attachments) => {
  try {
    const transportSMTP = nodemailer.createTransport({
      host: ,
      port: ,
      secure: false,
      auth: {
        user: username,
        pass: password
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
    return false;
  }
};
