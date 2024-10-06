import { SorterResult } from "antd/es/table/interface";
import { isArray } from "lodash";

import { TFilterSchema } from "@/features/filter";

export const FILTER_ID: TFilterSchema<Record<"flow_id", string>> = {
  name: "flow_id",
  type: "string",
  element: "input",
  placeholder: "ID",
};

export const FILTER_NO: TFilterSchema<Record<"no", number>> = {
  name: "no",
  type: "number",
  element: "number",
  placeholder: "ID",
};

export const getSortOrder = <T extends Record<string, unknown>>(
  sorter: SorterResult<T> | SorterResult<T>[],
) => {
  if (!isArray(sorter)) {
    const { order, field, columnKey } = sorter;
    const sortName = columnKey ?? field;

    if (order && typeof sortName === "string") {
      return order === "ascend" ? sortName : `${sortName} desc`;
    } else {
      return "";
    }
  }
};
