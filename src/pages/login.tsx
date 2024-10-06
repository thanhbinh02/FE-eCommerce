import { useEffect } from "react";

import { Alert, Card, ConfigProvider, Image } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { COLOR } from "@/data/constant";
import { EnterOTP, LoginForm } from "@/features/auth";
import { useAppLocalStorage } from "@/features/local-storage";

const Login = () => {
  const { tokens, resetToken, otpResendDuration } = useAppLocalStorage();

  const navigate = useNavigate();

  useEffect(() => {
    if (tokens && !resetToken) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, [navigate, resetToken, tokens]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLOR.PRIMARY,
          colorTextPlaceholder: COLOR.PRIMARY,
          colorText: COLOR.PRIMARY,
        },
      }}
    >
      <div className="!overflow-auto">
        {otpResendDuration === 1 && (
          <Alert
            message="OTP đã hết hiệu lực. Vui lòng bấm gửi lại OTP."
            type="warning"
            closable
            className="w-85 absolute right-1 top-1 z-50"
          />
        )}

        <div className="grid justify-center w-full h-full items-center">
          <StyledCard>
            <div className="text-center">
              <Image
                src="/logo.png"
                alt="Brand logo"
                preview={false}
                width="40vh"
                className="mb-8"
              />
            </div>
            <div className="text-3xl font-bold text-center">Đăng nhập</div>

            {resetToken?.isForgotPassword === false ? (
              <EnterOTP />
            ) : (
              <LoginForm />
            )}
          </StyledCard>
        </div>
      </div>
    </ConfigProvider>
  );
};

const StyledCard = styled(Card)`
  width: 35vw;
  min-width: 58vh;
  max-height: 90vh;
  border: none !important;
`;

export default Login;
