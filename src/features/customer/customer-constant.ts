import { CustomerGender } from "./services/customer-enum";
import { ConstantBreadcrumbs, ConstantList } from "@/data/class";

export const CUSTOMER_NAME = "khách hàng";
export const CUSTOMERS_PATH = "/customers";

export const CUSTOMER_BREADCRUMBS = new ConstantBreadcrumbs({
  baseName: `Danh sách ${CUSTOMER_NAME}`,
  basePath: CUSTOMERS_PATH,
});

export const CUSTOMER_GENDER = new ConstantList([
  {
    value: CustomerGender.MALE,
    label: "Nam",
  },
  {
    value: CustomerGender.FEMALE,
    label: "Nữ",
  },
  {
    value: CustomerGender.OTHER,
    label: "Khác",
  },
]);
