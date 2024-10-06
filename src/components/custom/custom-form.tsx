import { FC, ReactNode } from "react";

import { Form, FormProps, message } from "antd";

type Props = FormProps & {
  children: ReactNode;
};

const CustomForm: FC<Props> = ({ children, ...formProps }) => {
  const handleFinishFailed = () => {
    void message.error(
      "Thông tin các trường chưa đúng định dạng. Vui lòng kiểm tra lại"
    );
  };

  return (
    <Form {...formProps} onFinishFailed={handleFinishFailed}>
      {children}
    </Form>
  );
};

export default CustomForm;
