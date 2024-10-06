import { useLocalStorage } from "usehooks-ts";

import { TResetToken } from "../services/types";
import { ResponseVerifyOTP } from "@/features/auth";

export const useAppLocalStorage = () => {
  const [resetToken, setResetToken, removeResetToken] =
    useLocalStorage<TResetToken | null>("resetToken", null);

  const [tokens, setTokens, removeTokens] = useLocalStorage<
    ResponseVerifyOTP["data"] | null
  >("tokens", null);

  const [otpResendDuration, setOtpResendDuration, removeOtpResendDuration] =
    useLocalStorage<number | null>("otpResendDuration", null);

  const removeAllAuthData = () => {
    removeOtpResendDuration();
    removeResetToken();
    removeTokens();
  };

  return {
    tokens,
    resetToken,
    otpResendDuration,
    setTokens,
    setResetToken,
    setOtpResendDuration,
    removeTokens,
    removeResetToken,
    removeOtpResendDuration,
    removeAllAuthData,
  };
};
