import { FC, useMemo, useState } from "react";

import { Button, Form, Input, message, Modal, Steps } from "antd";
import { AiOutlineLock } from "react-icons/ai";
import { useBoolean } from "usehooks-ts";

import OTPNote from "./otp-note";
import { OTP_LENGTH } from "../constant";
import {
  useCreatePasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
} from "../hooks/use-auth-query";
import useCountDownSecond from "../hooks/use-count-down-second";
import { EStepForgotPassword } from "../services/enums";
import { CommonButton, CustomDescriptions, SubmitButton } from "@/components";
import { useAppLocalStorage } from "@/features/local-storage";
import { validator, validatorFn } from "@/utils";

type TFormValue = {
  email: string;
  otp: string;
  new_password: string;
  re_type_new_password: string;
};

const ForgotPassword: FC = () => {
  const [form] = Form.useForm();
  const { value: openForgotPassword, setTrue, setFalse } = useBoolean(false);
  const [currentStep, setCurrentStep] = useState(EStepForgotPassword["EMAIL"]);
  const { resetToken, removeAllAuthData, setTokens } = useAppLocalStorage();
  const {
    otpValidDuration,
    handleResendOTP,
    isRefreshOTPPending,
    clearCurrentInterval,
  } = useCountDownSecond(true);

  const {
    mutate: resetPasswordMutate,
    isPending: isResetPasswordMutatePending,
  } = useResetPasswordMutation();

  const { mutate: verifyOTPMutation, isPending: isVerifyOTPMutationPending } =
    useVerifyOTPMutation();

  const {
    mutate: createPasswordMutation,
    isPending: isCreatePasswordMutationPending,
  } = useCreatePasswordMutation();

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setFalse();
    form.resetFields();
    setCurrentStep(EStepForgotPassword["EMAIL"]);
    removeAllAuthData();
  };

  const handleFinish = (value: TFormValue) => {
    if (currentStep === EStepForgotPassword["EMAIL"]) {
      resetPasswordMutate(
        {
          email: value.email,
        },
        {
          onSuccess: nextStep,
        },
      );
      return;
    }

    if (currentStep === EStepForgotPassword["OTP"]) {
      verifyOTPMutation(
        {
          otp: value.otp,
          active_token: resetToken!.value,
        },
        {
          onSuccess: ({ data }) => {
            setTokens(data);
            clearCurrentInterval();
            nextStep();
            void message.success(
              "Xác nhận OTP thành công! Vui lòng thay đổi mật khẩu mới!",
            );
          },
        },
      );

      return;
    }

    if (currentStep === EStepForgotPassword["CHANGE_PASSWORD"]) {
      createPasswordMutation(
        {
          new_password: value.new_password,
          re_type_new_password: value.re_type_new_password,
        },
        {
          onSuccess: () => {
            handleCloseModal();

            void message.success(
              "Thay đổi mật khẩu thành công. Vui lòng đăng nhập.",
            );
          },
        },
      );

      return;
    }
  };

  const submitButtonText = useMemo(() => {
    if (currentStep === EStepForgotPassword["EMAIL"]) return "Gửi";
    if (currentStep === EStepForgotPassword["OTP"]) return "Kiểm tra OTP";
    return "Xác nhận";
  }, [currentStep]);

  const steps = useMemo(
    () => [
      {
        key: EStepForgotPassword["EMAIL"],
        title: "Gửi mã code tới email đã đăng kí",
        content: [
          {
            isRequired: true,
            label: "Nhập email đã đăng kí của bạn",
            element: (
              <Form.Item
                name="email"
                rules={validator("email").concat(
                  validatorFn("required")("nhập email"),
                )}
              >
                <Input placeholder="Email" />
              </Form.Item>
            ),
          },
        ],
      },
      {
        key: EStepForgotPassword["OTP"],
        title: "Kiểm tra mã code đã gửi tới email",
        content: [
          {
            isRequired: true,
            label: "Nhập mã code đã nhận",
            element: (
              <>
                <p className="!text-black my-1">
                  Vui lòng nhập mã OTP được gửi tới email{" "}
                  <span className="font-bold">{resetToken?.email}</span>
                </p>
                <Form.Item
                  name="otp"
                  rules={validatorFn("required")("nhập mã code")}
                >
                  <Input.OTP length={OTP_LENGTH} />
                </Form.Item>
              </>
            ),
          },
        ],
      },
      {
        key: EStepForgotPassword["CHANGE_PASSWORD"],
        title: "Đổi password mới",
        content: [
          {
            isRequired: true,
            label: "Mật khẩu mới",
            element: (
              <Form.Item
                name="new_password"
                rules={validator("noWhiteSpace")
                  .concat(validatorFn("minAndMax")(8, 16))
                  .concat(validatorFn("required")("nhập mật khẩu mới"))}
              >
                <Input.Password
                  prefix={<AiOutlineLock />}
                  placeholder="Mật khẩu"
                />
              </Form.Item>
            ),
          },
          {
            isRequired: true,
            label: "Xác nhận mật khẩu mới",
            element: (
              <Form.Item
                name="re_type_new_password"
                rules={validator("noWhiteSpace")
                  .concat(validatorFn("minAndMax")(8, 16))
                  .concat(validatorFn("required")("nhập xác nhận mật khẩu mới"))
                  .concat([
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "Nội dung phải trùng khớp với mật khẩu trên",
                          ),
                        );
                      },
                    }),
                  ])}
              >
                <Input.Password
                  prefix={<AiOutlineLock />}
                  placeholder="Xác nhận mật khẩu"
                />
              </Form.Item>
            ),
          },
        ],
      },
    ],
    [resetToken?.email],
  );

  return (
    <>
      <CommonButton action="nothing" onClick={setTrue}>
        Quên mật khẩu
      </CommonButton>

      <Modal
        open={openForgotPassword}
        onCancel={handleCloseModal}
        title="Quên mật khẩu"
        width={900}
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <Steps current={currentStep - 1} items={steps} />

          <Form
            form={form}
            onFinish={handleFinish}
            disabled={
              isResetPasswordMutatePending ||
              isVerifyOTPMutationPending ||
              isCreatePasswordMutationPending
            }
          >
            <div className="flex-col-common">
              <CustomDescriptions
                data={steps[currentStep - 1].content}
                labelWidth={270}
              />

              {currentStep === EStepForgotPassword["OTP"] && <OTPNote />}

              <div className="flex gap-2 justify-end">
                {currentStep === EStepForgotPassword["OTP"] && (
                  <Button
                    disabled={otpValidDuration !== 0 || isRefreshOTPPending}
                    onClick={handleResendOTP}
                  >
                    Gửi lại mã
                  </Button>
                )}

                <SubmitButton form={form} text={submitButtonText} />
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
