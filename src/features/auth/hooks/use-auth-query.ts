import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

import { OTP_VALID_DURATION } from "../constant";
import authApi from "../services/auth-api";
import { useAppLocalStorage } from "@/features/local-storage";

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
  });
};

export const useVerifyOTPMutation = () => {
  return useMutation({
    mutationFn: authApi.verityOTP,
  });
};

export const useRefreshOTPMutation = (isForgotPassword: boolean) => {
  const { setResetToken } = useAppLocalStorage();

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
  });
};

export const useCreatePasswordMutation = () => {
  return useMutation({
    mutationFn: authApi.createPassword,
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
