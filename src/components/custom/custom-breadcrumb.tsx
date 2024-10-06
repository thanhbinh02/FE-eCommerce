import { FC } from "react";

import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { BreadcrumbProps } from "antd/lib";
import { Link } from "react-router-dom";

const itemRender = (): BreadcrumbProps["itemRender"] => (route, _, routes) => {
  const isLast = routes.indexOf(route) === routes.length - 1;
  return isLast || !route.path ? (
    <span>{route.title}</span>
  ) : (
    <Link to={route.path}>{route.title}</Link>
  );
};

type Props = {
  routes?: ItemType[];
};

const CustomBreadcrumb: FC<Props> = ({ routes = [] }) => {
  return (
    <Breadcrumb
      style={{ marginBottom: routes.length > 0 ? 10 : 0 }}
      items={routes}
      itemRender={itemRender()}
    />
  );
};

export default CustomBreadcrumb;
