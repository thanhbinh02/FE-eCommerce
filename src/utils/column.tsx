import { Badge } from "antd";
import { ColumnType } from "antd/es/table";
import { SortOrder } from "antd/es/table/interface";

import { formatToTimeString } from "./date";
import { formatNumber } from "./number";
import { CommonButton, StatusTag } from "@/components";
import { ConstantList } from "@/data/class";
import { STATUS } from "@/data/constant";

export const createIdColumn = <T extends object>(
  width = 80,
): ColumnType<T> => ({
  title: "ID",
  dataIndex: "id",
  align: "center",
  width,
});

export const createActionColumn = <T extends { id: number | string }>(
  PATH: string,
  title = "Xem chi tiết",
  width = 100,
): ColumnType<T> => ({
  title,
  align: "center",
  fixed: "right",
  width: width,
  render: (record: T) => <CommonButton action="view" href={`${record.id}`} />,
});

export const createTimestampColumn = <T extends object>(
  title: string,
  width: number,
  dataIndex: string,
  key?: string,
  getDefaultSortOrder?: ((filed: string) => SortOrder) | undefined,
): ColumnType<T> => ({
  title,
  width,
  dataIndex,
  align: "center",
  sorter: !!key,
  render: formatToTimeString,
  ...(getDefaultSortOrder && {
    sortOrder: getDefaultSortOrder(key || dataIndex),
  }),
  key,
});

export const createCreateAtColumn = <T extends object>({
  title = "Thời gian tạo",
  width = 160,
  dataIndex = "createdAt",
}: {
  title?: string;
  width?: number;
  dataIndex?: string;
} = {}): ColumnType<T> => ({
  title,
  width,
  dataIndex,
  align: "center",
  render: formatToTimeString,
});

export const createStatusColumn = <T extends Record<string, unknown>>({
  title = "Trạng thái",
  statusList = STATUS,
  dataIndex = "status",
  width = 140,
}: Partial<{
  title: string;
  statusList: ConstantList<{
    value: number;
    label: string;
    color: string;
  }>;
  dataIndex: ColumnType<T>["dataIndex"];
  width: number;
}>): ColumnType<T> => ({
  title: title,
  width: width,
  dataIndex,
  align: "center",
  render: (value: number) => (
    <div className="[&_.ant-tag]:w-full !w-full">
      <StatusTag statusObj={statusList.getObjByKey(value)} />
    </div>
  ),
});

export const createNoColumn = <T extends object>({
  width = 120,
  title = "ID",
}: {
  width?: number;
  title?: string;
} = {}): ColumnType<T> => ({
  title,
  dataIndex: "no",
  align: "center",
  width: width,
});

export const createUpdateAtColumn = <T extends object>({
  title = "Thời gian cập nhật lần cuối",
  width = 160,
  dataIndex = "updatedAt",
}: {
  title?: string;
  width?: number;
  dataIndex?: string;
} = {}): ColumnType<T> => ({
  title,
  width,
  dataIndex,
  align: "center",
  render: formatToTimeString,
});

export const RenderTableCellList = ({
  options,
}: {
  options: {
    value: number;
    label: string;
  }[];
}) => {
  return (
    <div className="flex flex-col max-h-[160px] w-full overflow-y-auto">
      {options?.map((item) => (
        <Badge key={item.label} status="default" text={item.value} />
      ))}
    </div>
  );
};

export const createNumberColumn = <T extends object>(
  title: string,
  width: number,
  dataIndex: string,
): ColumnType<T> => ({
  title,
  width,
  dataIndex,
  align: "right",
  render: formatNumber,
});
