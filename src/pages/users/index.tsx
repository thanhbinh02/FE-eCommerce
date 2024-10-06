import { Card } from "antd";

import { BreadcrumbsWrapper } from "@/components";
import { USER_BREADCRUMBS } from "@/features/user";

const Users = () => {
  return (
    <BreadcrumbsWrapper breadcrumbs={USER_BREADCRUMBS.list}>
      <Card title="Danh sách người dùng">Danh sách</Card>
    </BreadcrumbsWrapper>
  );
};

export default Users;
