import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

import {
  LOGIN_ERROR_MESSAGE,
  OTP_VALID_DURATION,
  REFRESH_OTP_ERROR_MESSAGE,
  RESET_PASSWORD_ERROR_MESSAGE,
  VERIFY_OTP_ERROR_MESSAGE,
} from "../constant";
import authApi from "../services/auth-api";
import {
  TLoginErrors,
  TRefreshOTPErrors,
  TResetPasswordErrors,
  TVerifyOTPErrors,
} from "../services/types";
import { useAppLocalStorage } from "@/features/local-storage";
import { ResponseError } from "@/ts";
import { showErrorMessage } from "@/utils";

export const useLoginMutation = () => {
  const { setResetToken } = useAppLocalStorage();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      setResetToken({
        value: data.reset_token,
        isForgotPassword: false,
        refreshExpiredAt: data.refresh_expired_at,
        email: data.email,
      });

      void message.success("Xác thực tài khoản thành công. Vui lòng nhập OTP.");
    },
    onError: (error: ResponseError<TLoginErrors>) => {
      void showErrorMessage(error, LOGIN_ERROR_MESSAGE);
    },
  });
};

export const useVerifyOTPMutation = () => {
  const { removeAllAuthData } = useAppLocalStorage();

  return useMutation({
    mutationFn: authApi.verityOTP,
    onError: (error: ResponseError<TVerifyOTPErrors>) => {
      void showErrorMessage(error, VERIFY_OTP_ERROR_MESSAGE);
      if (error.response?.data.message === "system_message_token_not_found") {
        removeAllAuthData();
      }
    },
  });
};

export const useRefreshOTPMutation = (isForgotPassword: boolean) => {
  const { setResetToken, removeAllAuthData } = useAppLocalStorage();

  return useMutation({
    mutationFn: authApi.refreshOTP,
    onSuccess: ({ data }) => {
      setResetToken({
        value: data.reset_token,
        isForgotPassword,
        refreshExpiredAt: data.refresh_expired_at,
        email: data.email,
      });

      void message.success("Mã OTP mới đã được gửi! Vui lòng kiểm tra Email.");
    },
    onError: (error: ResponseError<TRefreshOTPErrors>) => {
      void showErrorMessage(error, REFRESH_OTP_ERROR_MESSAGE);
      if (error.response?.data.message === "system_message_token_not_found") {
        removeAllAuthData();
      }
    },
  });
};

export const useResetPasswordMutation = () => {
  const { setResetToken, setOtpResendDuration } = useAppLocalStorage();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: ({ data }) => {
      setResetToken({
        value: data.reset_token,
        isForgotPassword: true,
        refreshExpiredAt: data.refresh_expired_at,
        email: data.email,
      });
      setOtpResendDuration(OTP_VALID_DURATION);
      void message.success(
        "Mã OTP tới Email thành công! Vui lòng kiểm tra Email.",
      );
    },
    onError: (error: ResponseError<TResetPasswordErrors>) => {
      void showErrorMessage(error, RESET_PASSWORD_ERROR_MESSAGE);
    },
  });
};

export const useCreatePasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.createPassword,
    onError: (error: ResponseError<TResetPasswordErrors>) => {
      void showErrorMessage(error, RESET_PASSWORD_ERROR_MESSAGE);
    },
  });
};

export const useLogoutMutation = () => {
  const { removeAllAuthData } = useAppLocalStorage();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      void message.success("Đăng xuất thành công");
      void removeAllAuthData();
    },
  });
};

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authApi.profile,
    select: (data) => data.data,
  });
};
