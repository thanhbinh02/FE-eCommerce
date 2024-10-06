import { FC, ReactNode } from "react";

import { Spin } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import CustomBreadcrumb from "../custom/custom-breadcrumb";

type Props = {
  isLoading?: boolean;
  breadcrumbs?: ItemType[];
  children: ReactNode;
};

const BreadcrumbsWrapper: FC<Props> = ({
  isLoading = false,
  breadcrumbs,
  children,
}) => {
  return (
    <>
      <CustomBreadcrumb routes={breadcrumbs} />
      <Spin spinning={isLoading}>
        <div className="flex-col-common">{children}</div>
      </Spin>
    </>
  );
};

export default BreadcrumbsWrapper;
