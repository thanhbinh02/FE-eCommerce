import { useEffect, useMemo, useState, useRef } from "react";

import dayjs from "dayjs";
import {
  clearInterval as clearIntervalWorkerTimers,
  setInterval as setIntervalWorkerTimers,
} from "worker-timers";

import { useRefreshOTPMutation } from "./use-auth-query";
import { OTP_RESEND_DURATION, OTP_VALID_DURATION } from "../constant";
import { useAppLocalStorage } from "@/features/local-storage";

type TResult = {
  otpValidDuration: number;
  handleResendOTP: () => void;
  isRefreshOTPPending: boolean;
  clearCurrentInterval: () => void;
};

const useCountDownSecond = (isForgotPassword: boolean): TResult => {
  const { resetToken, otpResendDuration, setOtpResendDuration } =
    useAppLocalStorage();
  const [seconds, setSeconds] = useState(0);
  const { mutate, isPending } = useRefreshOTPMutation(isForgotPassword);
  const intervalRef = useRef<number | null>(null);

  const clearCurrentInterval = () => {
    if (intervalRef.current) {
      clearIntervalWorkerTimers(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const initialValues = useMemo(() => {
    if (!resetToken) return 0;
    const diffTime = Math.abs(
      dayjs().diff(resetToken?.refreshExpiredAt, "second"),
    );

    if (diffTime > OTP_VALID_DURATION) return 0;
    return diffTime;
  }, [resetToken]);

  useEffect(() => {
    setSeconds(initialValues);
  }, [initialValues]);

  useEffect(() => {
    clearCurrentInterval();

    if (!seconds || seconds <= 0) {
      return;
    }

    setOtpResendDuration(seconds);

    if (seconds <= 0 || !resetToken) return;

    intervalRef.current = setIntervalWorkerTimers(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearCurrentInterval();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return clearCurrentInterval;
  }, [otpResendDuration, resetToken, seconds, setOtpResendDuration]);

  const handleResendOTP = () => {
    mutate(
      {
        active_token: resetToken!.value,
      },
      {
        onSuccess: () => {
          clearCurrentInterval();
          setSeconds(OTP_VALID_DURATION);
        },
      },
    );
  };

  const otpValidDuration = useMemo(() => {
    const result = seconds - (OTP_VALID_DURATION - OTP_RESEND_DURATION);
    return result < 0 ? 0 : result;
  }, [seconds]);

  return {
    otpValidDuration,
    handleResendOTP,
    isRefreshOTPPending: isPending,
    clearCurrentInterval,
  };
};

export default useCountDownSecond;
