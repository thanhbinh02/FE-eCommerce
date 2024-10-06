import { Button, Form } from "antd";

import { BreadcrumbsWrapper } from "@/components";
import {
  CUSTOMER_BREADCRUMBS,
  CustomerForm,
  CustomerInfo,
  useCreateCustomerMutation,
} from "@/features/customer";
import { formatDateToString } from "@/utils";

const CreateCustomerPage = () => {
  const [form] = Form.useForm();

  const { mutate, isPending } = useCreateCustomerMutation();

  const handleFinish = (value: CustomerForm) => {
    mutate({
      ...value,
      dateOfBirth: formatDateToString(value.dateOfBirth, "YYYY/MM/DD"),
    });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={CUSTOMER_BREADCRUMBS.getCustomBreadcrumb(
        "Tạo mới khách hàng",
      )}
      isLoading={isPending}
    >
      <Form form={form} onFinish={handleFinish}>
        <CustomerInfo />
      </Form>

      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel}>Huỷ</Button>

        <Button onClick={form.submit} type="primary">
          Tạo mới
        </Button>
      </div>
    </BreadcrumbsWrapper>
  );
};

export default CreateCustomerPage;
