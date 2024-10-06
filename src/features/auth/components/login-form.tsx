import { FC } from "react";

import { Button, Checkbox, Form, Input } from "antd";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useSessionStorage } from "usehooks-ts";

import ForgotPassword from "./forgot-password";
import { useLoginMutation } from "../hooks/use-auth-query";
import { BodyLogin } from "../services/types";
import { validator, validatorFn } from "@/utils";

type Values = BodyLogin & {
  isSaved?: boolean;
};

const LoginForm: FC = () => {
  const [savedData, setSavedData] = useSessionStorage<
    Partial<Values> | undefined
  >("savedData", {
    isSaved: false,
  });

  const { mutate, isPending } = useLoginMutation();

  const handleFinish = (values: Values) => {
    const { isSaved, ...formValues } = values;
    setSavedData(
      isSaved
        ? values
        : {
            isSaved: false,
          },
    );

    mutate(formValues);
  };

  return (
    <Form
      initialValues={savedData}
      onFinish={handleFinish}
      disabled={isPending}
      className="mt-6"
    >
      <Form.Item
        name="email"
        rules={validator("email").concat(validatorFn("required")("nhập email"))}
        className="mb-[2vh]"
      >
        <Input prefix={<AiOutlineUser />} size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={validator("noWhiteSpace")
          .concat(validatorFn("minAndMax")(8, 16))
          .concat(validatorFn("required")("nhập mật khẩu"))}
        className="mb-[2vh]"
      >
        <Input.Password
          prefix={<AiOutlineLock />}
          placeholder="Mật khẩu"
          size="large"
        />
      </Form.Item>

      <div className="flex-between-common mb-4 !font-semibold">
        <Form.Item name="isSaved" valuePropName="checked" className="mb-0">
          <Checkbox>
            <span className="text-black">Lưu mật khẩu</span>
          </Checkbox>
        </Form.Item>

        <ForgotPassword />
      </div>

      <Button className="!w-full font-bold" htmlType="submit" type="primary">
        Đăng nhập
      </Button>
    </Form>
  );
};

export default LoginForm;
