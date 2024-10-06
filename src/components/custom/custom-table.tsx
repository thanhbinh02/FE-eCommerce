import { memo } from "react";

import { Table, TableProps } from "antd";

import { formatNumber } from "@/utils";

type CustomTableProps<T extends object> = TableProps<T> & {
  name?: string;
  scrollX?: number;
  isLoading?: boolean;
  hasPagination?: false;
};

const CustomTable = <T extends object>({
  rowKey = "id",
  dataSource = [],
  columns = [],
  name,
  isLoading,
  hasPagination,
  pagination,
  scrollX = 1200,
  onChange,
  ...props
}: CustomTableProps<T>) => {
  return (
    <Table
      rowKey={rowKey}
      size="middle"
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={
        hasPagination ?? {
          position: ["topRight", "bottomRight"],
          showSizeChanger: false,
          showLessItems: true,
          showTotal: (total, range) =>
            `${formatNumber(total)}${name ? " ".concat(name) : ""} | Từ ${
              range[0]
            } đến ${range[1]}`,
          ...pagination,
        }
      }
      scroll={{ x: scrollX }}
      loading={isLoading}
      locale={{
        triggerDesc: "Sắp xếp theo thứ tự giảm dần",
        triggerAsc: "Sắp xếp theo thứ tự tăng dân",
        cancelSort: "Hủy sắp xếp",
      }}
      {...props}
    />
  );
};

export default memo(CustomTable) as typeof CustomTable;
