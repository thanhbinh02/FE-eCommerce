import { useState } from "react";

import { Button, GetProps, Input, message } from "antd";
import styled from "styled-components";

import OTPNote from "./otp-note";
import { OTP_LENGTH } from "../constant";
import { useVerifyOTPMutation } from "../hooks/use-auth-query";
import useCountDownSecond from "../hooks/use-count-down-second";
import { COLOR } from "@/data/constant";
import { useAppLocalStorage } from "@/features/local-storage";

type OTPProps = GetProps<typeof Input.OTP>;

const EnterOTP = () => {
  const [otp, setOTP] = useState("");

  const {
    setTokens,
    removeResetToken,
    removeOtpResendDuration,
    resetToken,
    removeAllAuthData,
  } = useAppLocalStorage();

  const { mutate, isPending } = useVerifyOTPMutation();

  const { otpValidDuration, handleResendOTP, isRefreshOTPPending } =
    useCountDownSecond(false);

  const onChange: OTPProps["onChange"] = (text) => {
    setOTP(text);
  };

  const handleConfirm = () => {
    mutate(
      {
        otp,
        active_token: resetToken!.value,
      },
      {
        onSuccess: ({ data }) => {
          setTokens(data);
          removeResetToken();
          removeOtpResendDuration();
          void message.success("Đăng nhập thành công");
        },
      },
    );
  };

  return (
    <StyleDiv className="flex flex-col">
      <p className="!text-black my-4 text-center">
        Vui lòng nhập mã OTP được gửi tới email{" "}
        <span className="font-bold">{resetToken?.email}</span>
      </p>

      <Input.OTP
        className="otp"
        size="large"
        formatter={(str) => str.toUpperCase()}
        onChange={onChange}
        length={OTP_LENGTH}
      />

      <Button
        className="mt-6 font-bold"
        onClick={handleConfirm}
        type="primary"
        disabled={otp.length !== OTP_LENGTH || isPending}
      >
        Xác nhận
      </Button>

      <Button
        className="mt-2 font-bold"
        onClick={removeAllAuthData}
        disabled={isPending}
      >
        Đăng nhập tài khoản khác
      </Button>

      <div className="flex-between-common mt-2">
        <p className="!text-black">Không nhận được mã OTP?</p>

        <Button
          disabled={otpValidDuration !== 0 || isRefreshOTPPending || isPending}
          onClick={handleResendOTP}
        >
          GỬI LẠI MÃ OTP
        </Button>
      </div>

      <OTPNote />
    </StyleDiv>
  );
};

export default EnterOTP;

const StyleDiv = styled.div`
  .ant-input {
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid ${COLOR.PRIMARY};
    font-size: 24px;
  }

  .ant-input:focus {
    border: none;
    box-shadow: none;
    background-color: white;
    border-bottom: 1px solid ${COLOR.PRIMARY};
  }
`;
