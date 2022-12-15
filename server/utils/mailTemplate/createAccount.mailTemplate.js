export const createAccountOTPMail = (fullname, otp) => `<!DOCTYPE html>
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
        Kính chào <b>${fullname}</b>,<br>
        <span style="padding-left: 20px">
        Bạn tạo thành công tài khoản ngân hàng, mã OTP của bạn là: <h3>${otp}</h3>
        </span><br><br>
        <span style="padding-left: 20px">
        Dùng mã này để kích hoạt tài khoảng. Mã sẽ hết hạn trong vòng 10 phút.
        </span><br><br>
        <span style="padding-left: 20px">
        vui lòng không chia sẽ mã này cho bất kì ai. Xin chân thành cảm ơn!
        </span><br><br>
        <span style="padding-left: 20px">
        <i>Đây là email tự động, vui lòng KHÔNG REPLY lại email này!</i>
        </span><br><br>
        Thanks & Best Regards.
      </p>        
    </div>
  </body>
  </html>`;
