import { useEffect, useMemo } from "react";

import { Button, Form } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { BreadcrumbsWrapper } from "@/components";
import {
  CUSTOMER_BREADCRUMBS,
  CustomerForm,
  CustomerInfo,
  useGetCustomerDetailsQuery,
  useUpdateCustomerMutation,
} from "@/features/customer";
import { differentObject, formatDateToString } from "@/utils";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data, isLoading, isFetching } = useGetCustomerDetailsQuery(+id!);
  const { mutate, isPending } = useUpdateCustomerMutation(+id!);

  const initialValues = useMemo(() => {
    if (data) {
      return {
        ...data,
        dateOfBirth: dayjs(data.dateOfBirth),
      };
    }
  }, [data]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleFinish = (value: CustomerForm) => {
    const dataChanged = differentObject(value, initialValues);

    mutate({
      ...dataChanged,
      dateOfBirth: formatDateToString(value.dateOfBirth, "YYYY/MM/DD"),
    });
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return (
    <BreadcrumbsWrapper
      breadcrumbs={CUSTOMER_BREADCRUMBS.getCustomBreadcrumb(
        "Chi tiết khách hàng",
      )}
      isLoading={isLoading || isFetching || isPending}
    >
      <Form form={form} initialValues={initialValues} onFinish={handleFinish}>
        <CustomerInfo data={data} />
      </Form>

      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel}>Huỷ</Button>

        <Button onClick={form.submit} type="primary">
          Cập nhật
        </Button>
      </div>
    </BreadcrumbsWrapper>
  );
};

export default CustomerDetailsPage;
