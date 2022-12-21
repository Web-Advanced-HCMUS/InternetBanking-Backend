export const transactionOTPMail = (otp, amount) => `<!DOCTYPE html>
  <head>
    <style>
      body {
        font-family: Calibri;
      }
    </style>
  </head>
  <body>
    <div>
      <p>
        <span style="padding-left: 20px">
        Mã OTP của bạn là: <h3>${otp}</h3>
        Để xác thực giao dịch chuyển tiền với số tiền ${amount} VND
        </span><br><br>
        <span style="padding-left: 20px">
        Mã sẽ hết hạn trong vòng 2 phút.
        </span><br><br>
        <span style="padding-left: 20px">
        Tuyệt đối không cung cấp OTP cho người khác, tránh bị kẻ gian lợi dụng.
        </span><br><br>
        <span style="padding-left: 20px">
        <i>Đây là email tự động, vui lòng KHÔNG REPLY lại email này!</i>
        </span><br><br>
        Thanks & Best Regards.
      </p>        
    </div>
  </body>
  </html>`;
