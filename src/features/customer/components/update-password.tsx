import { Button, Form, Input, Modal } from "antd";
import { useParams } from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import { useUpdatePasswordCustomerMutation } from "../hooks/use-customer-query";
import { UpdatePasswordBody } from "../services/customer-types";
import { CustomDescriptions } from "@/components";
import { useOpenModal } from "@/hooks";
import { DescriptionsRecord } from "@/ts";
import { validatorFn } from "@/utils";

const UpdatePassword = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { isOpenModal, setOpenModal, handleCloseModal } = useOpenModal(form);

  const { mutate, isPending } = useUpdatePasswordCustomerMutation(+id!);

  const handleFinish = (value: UpdatePasswordBody) => {
    mutate(value, {
      onSuccess: handleCloseModal,
    });
  };

  return (
    <>
      <Button onClick={setOpenModal} type="primary">
        Cập nhật mật khẩu
      </Button>

      <Modal
        title="Cập nhật khẩu khẩu"
        open={isOpenModal}
        onOk={form.submit}
        onCancel={handleCloseModal}
        width={800}
      >
        <Form form={form} onFinish={handleFinish} disabled={isPending}>
          <CustomDescriptions data={descriptions} />
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePassword;

const descriptions: DescriptionsRecord[] = [
  {
    isRequired: true,
    label: "Mật khẩu cũ",
    element: (
      <Form.Item
        name="password"
        rules={validatorFn("required")("nhập mật khẩu cũ")}
      >
        <Input.Password placeholder="Nhập mật khẩu cũ" />
      </Form.Item>
    ),
  },
  {
    isRequired: true,
    label: "Mật khẩu mới",
    element: (
      <Form.Item
        name="newPassword"
        rules={validatorFn("required")("nhập mật khẩu mới")}
      >
        <Input.Password placeholder="Nhập mật khẩu mới" />
      </Form.Item>
    ),
  },
];
