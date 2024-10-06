import { FC, useMemo } from "react";

import { Card, DatePicker, Form, Input, Radio } from "antd";

import { CUSTOMER_GENDER } from "../customer-constant";
import { CustomerType } from "../services/customer-types";
import { CustomDescriptions } from "@/components";
import { DescriptionsRecord } from "@/ts";
import { validatorFn } from "@/utils";
import UpdatePassword from "./update-password";

type CustomerInfoProps = {
  data?: CustomerType;
};

const CustomerInfo: FC<CustomerInfoProps> = ({ data }) => {
  const descriptions = useMemo(
    (): DescriptionsRecord[] => [
      {
        isShow: !!data,
        label: "ID",
        element: data?.id,
      },
      {
        isRequired: true,
        label: "Tên khách hàng",
        element: (
          <Form.Item
            name="fullName"
            rules={validatorFn("required")("nhập tên khách hàng")}
          >
            <Input placeholder="Nhập tên khách hàng" />
          </Form.Item>
        ),
      },
      {
        label: "Bio",
        element: (
          <Form.Item name="bio">
            <Input.TextArea rows={3} placeholder="Nhập bio" />
          </Form.Item>
        ),
      },
      {
        isRequired: true,
        label: "Giới tính",
        element: (
          <Form.Item name="gender" rules={validatorFn("required")("giới tính")}>
            <Radio.Group options={CUSTOMER_GENDER.list} />
          </Form.Item>
        ),
      },
      {
        isRequired: true,
        label: "Ngày sinh",
        element: (
          <Form.Item
            name="dateOfBirth"
            rules={validatorFn("required")("chọn ngày sinh")}
          >
            <DatePicker placeholder="Chọn ngày sinh" format="DD/MM/YYYY" />
          </Form.Item>
        ),
      },
      {
        isRequired: true,
        label: "Số điện thoại",
        element: (
          <Form.Item
            name="phoneNumber"
            rules={validatorFn("required")("nhập số điện thoại")}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        ),
      },
      {
        isRequired: true,
        label: "Email",
        element: (
          <Form.Item name="email" rules={validatorFn("required")("nhập email")}>
            <Input placeholder="Nhập email" />
          </Form.Item>
        ),
      },
      {
        isShow: !data,
        isRequired: true,
        label: "Mật khẩu",
        element: (
          <Form.Item
            name="password"
            rules={validatorFn("required")("nhập password")}
          >
            <Input.Password placeholder="Nhập password" />
          </Form.Item>
        ),
      },
    ],
    [data],
  );

  return (
    <Card title="Thông tin khách hàng" extra={data && <UpdatePassword />}>
      <CustomDescriptions data={descriptions} />
    </Card>
  );
};

export default CustomerInfo;
