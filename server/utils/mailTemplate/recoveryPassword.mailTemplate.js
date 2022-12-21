export const recoverPasswordMail = (
  fullname,
  otp
) => `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
<div style="margin:50px auto;width:70%;padding:20px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Timo Digital Bank</a>
  </div>
  <p style="font-size:1.1em">Kính chào,${fullname}</p>
  <p>Bạn đã gửi yêu cầu khôi phục mật khẩu, mã OTP của bạn là:</p>
  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
  <p style="font-size:0.9em;">Vui lòng không chia sẽ mã này cho bất kì ai. Xin chân thành cảm ơn!<br />Đây là email tự động, vui lòng KHÔNG REPLY lại email này!</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>Timo Digital Inc</p>
    <p>227 Nguyen Van Cu, Ho Chi Minh City</p>
    <p>Vietnam</p>
  </div>
</div>
</div>`;
