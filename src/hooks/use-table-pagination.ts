import { useState } from "react";

import { TableProps } from "antd/lib";

import { DEFAULT_PAGINATION } from "@/data/constant";
import { getSortOrder } from "@/utils";

const useTablePagination = (pageSize = DEFAULT_PAGINATION.page_size) => {
  const [params, setParams] = useState(() => ({
    page: DEFAULT_PAGINATION.page,
    page_size: pageSize,
  }));

  const onChange: TableProps["onChange"] = ({ current }, _, sorter) => {
    setParams((prev) => ({
      ...prev,
      page: current!,
      order_by: getSortOrder(sorter),
    }));
  };

  return { params, onChange };
};

export default useTablePagination;
