import { Card } from "antd";
import { ColumnsType } from "antd/es/table";

import { BreadcrumbsWrapper, CommonButton, CustomTable } from "@/components";
import {
  CUSTOMER_BREADCRUMBS,
  CUSTOMER_GENDER,
  CustomerGender,
  CUSTOMERS_PATH,
  CustomerType,
  useGetCustomerListQuery,
} from "@/features/customer";
import {
  createActionColumn,
  createIdColumn,
  formatDateToString,
} from "@/utils";

const CustomersPage = () => {
  const { data, isLoading, isFetching } = useGetCustomerListQuery();

  return (
    <BreadcrumbsWrapper
      breadcrumbs={CUSTOMER_BREADCRUMBS.list}
      isLoading={isLoading || isFetching}
    >
      <Card
        title="Danh sách khách hàng"
        extra={
          <CommonButton action="add" href={`${CUSTOMERS_PATH}/create`}>
            Tạo mới
          </CommonButton>
        }
      >
        <CustomTable dataSource={data?.list} columns={columns} />
      </Card>
    </BreadcrumbsWrapper>
  );
};

export default CustomersPage;

const columns: ColumnsType<CustomerType> = [
  createIdColumn(),
  {
    title: "Tên khách hàng",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Giới tính",
    dataIndex: "gender",
    key: "gender",
    render: (value: CustomerGender) => CUSTOMER_GENDER.getLabelByKey(value),
  },
  {
    title: "Ngày sinh",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    render: (value: string) => formatDateToString(value),
    align: "center",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  createActionColumn(CUSTOMERS_PATH, "Tác vụ"),
];
