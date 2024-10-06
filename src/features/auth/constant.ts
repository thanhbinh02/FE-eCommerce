export const LOGIN_PATH = "/login";

export const VERIFY_OTP_ERROR_MESSAGE = {
  system_message_token_not_found: "Token không tồn tại! Vui lòng đăng nhập lại",
  system_message_token_expired: "OTP hết hiệu lực! Vui lòng lấy mã OTP mới",
  system_message_otp_invalid: "Sai OTP! Vui lòng nhập lại OTP.",
  system_message_account_has_been_locked:
    "Tài khoản bị khóa! Vui lòng đăng nhập tài khoản khác.",
};

export const LOGIN_ERROR_MESSAGE = {
  system_message_incorrect_email_format: "Sai định dạng Email.",
  system_message_invalid_username_or_password:
    "Email hoặc mật khẩu sai! Vui lòng thử lại.",
  system_message_account_has_been_locked: "Tài khoản bị khóa!",
};

export const REFRESH_OTP_ERROR_MESSAGE = {
  system_message_token_is_still_valid:
    "Vui lòng bấm gửi lại mã OTP sau 1 phút.",
  system_message_token_not_found:
    "Không tìm thấy token! Vui lòng đăng nhập lại!",
};

export const RESET_PASSWORD_ERROR_MESSAGE = {
  system_message_account_not_found:
    "Tài khoản không tồn tại! Vui lòng thử Email khác!",
  system_message_account_has_been_locked:
    "Tài khoản này đã bị khóa! Bạn không thể thực hiện đăng nhập hay đổi mật khẩu!",
  system_message_token_is_still_valid:
    "Bạn vừa mới đăng nhập hoặc thay đổi mật khẩu. Vui lòng thử lại sau!",
};

export const CREATE_PASSWORD_ERROR_MESSAGE = {
  system_message_password_not_match: "Vui lòng xác thực mật khẩu",
  system_message_account_has_been_locked:
    "Tài khoản này đã bị khóa! Bạn không thể thực hiện đăng nhập hay đổi mật khẩu!",
  system_message_token_is_still_valid:
    "Bạn vừa mới đăng nhập hoặc thay đổi mật khẩu. Vui lòng thử lại sau!",
};

export const OTP_VALID_DURATION = 300;

export const OTP_RESEND_DURATION = 60;

export const OTP_LENGTH = 6;
