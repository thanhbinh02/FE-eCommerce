import {
  LOGIN_ERROR_MESSAGE,
  REFRESH_OTP_ERROR_MESSAGE,
  RESET_PASSWORD_ERROR_MESSAGE,
  VERIFY_OTP_ERROR_MESSAGE,
} from "../constant";
import { FlattenKeys, ResponseData } from "@/ts";

// Login
export type BodyLogin = {
  email: string;
  password: string;
};

export type ResponseLogin = ResponseData<{
  reset_token: string;
  email: string;
  access_expired_at: string;
  refresh_expired_at: string;
}>;

export type TLoginErrors = FlattenKeys<typeof LOGIN_ERROR_MESSAGE>;

// Verify OTP
export type BodyVerifyOTP = {
  active_token: string;
  otp: string;
};

export type ResponseVerifyOTP = ResponseData<{
  access_token: string;
  refresh_token: string;
  access_expired_at: string;
  refresh_expired_at: string;
}>;

export type TVerifyOTPErrors = FlattenKeys<typeof VERIFY_OTP_ERROR_MESSAGE>;

// Refresh OTP
export type BodyRefreshOTP = {
  active_token: string;
};

export type ResponseRefreshOTP = ResponseData<{
  access_expired_at: string;
  email: string;
  refresh_expired_at: string;
  reset_token: string;
}>;

export type TRefreshOTPErrors = FlattenKeys<typeof REFRESH_OTP_ERROR_MESSAGE>;

// Reset password
export type BodyResetPassword = {
  email: string;
};

export type ResponseResetPassword = ResponseData<{
  reset_token: string;
  email: string;
  access_expired_at: string;
  refresh_expired_at: string;
}>;

export type TResetPasswordErrors = FlattenKeys<
  typeof RESET_PASSWORD_ERROR_MESSAGE
>;

// Create password
export type BodyCreatePassword = {
  new_password: string;
  re_type_new_password: string;
};

// Refresh token
export type BodyRefreshToken = {
  refresh_token: string;
};

export type TProfile = {
  fullname: string;
  email: string;
};
