import { useCallback, useMemo } from "react";

import { SortOrder } from "antd/es/table/interface";
import { TableProps } from "antd/lib";
import { filter as _filter, cloneDeep, keyBy, mapValues } from "lodash";
import { URLSearchParamsInit } from "react-router-dom";

import { TFilterSchema } from "../services/types";
import { formatFilterBeforeSyncURL, formatType } from "../utils";
import { DEFAULT_PAGINATION } from "@/data/constant";
import { useCustomSearchParams } from "@/hooks";
import { PageParams } from "@/ts";
import { getSortOrder } from "@/utils";

export const useFilter = <T extends Record<string, unknown> & PageParams>(
  filterSchema: TFilterSchema<T>[],
  defaultParam?: string,
) => {
  const { paramsRouter, setParamsRouter } = useCustomSearchParams();

  const schemaList = useMemo(
    () => _filter(filterSchema, "element"),
    [filterSchema],
  );

  const filter = useMemo(() => {
    const filterSchemaWithKey = keyBy(filterSchema, "name");
    return mapValues(paramsRouter, (v, k) =>
      formatValueWithType(filterSchemaWithKey[k], v),
    );
  }, [filterSchema, paramsRouter]);

  const apiFilter = useMemo(
    () => formatFilterBeforeSyncURL(filter),
    [filter],
  ) as T;

  const onResetFilter = () => {
    if (defaultParam) {
      setParamsRouter({
        [defaultParam]: paramsRouter[defaultParam],
        page_size: String(DEFAULT_PAGINATION.page_size),
      });
    } else {
      setParamsRouter({
        page: String(DEFAULT_PAGINATION.page),
        page_size: String(DEFAULT_PAGINATION.page_size),
        order_by: paramsRouter?.order_by,
      });
    }
  };

  const onFilterChange = useCallback(
    (newFilter: T) => {
      const cloneFilter = cloneDeep(newFilter);
      if (!cloneFilter.page) {
        cloneFilter.page = DEFAULT_PAGINATION.page;
      }

      setParamsRouter(
        formatFilterBeforeSyncURL({
          ...apiFilter,
          ...cloneFilter,
        }) as URLSearchParamsInit,
      );
    },
    [apiFilter, setParamsRouter],
  );

  const onChange: TableProps["onChange"] = (pagination, _, sorter) => {
    const { current, pageSize } = pagination;

    onFilterChange({
      page: current,
      page_size: pageSize,
      order_by: getSortOrder(sorter),
    } as unknown as T);
  };

  const getDefaultSortOrder = useCallback(
    (field: string): SortOrder => {
      const { order_by } = filter;
      if (
        order_by &&
        typeof order_by === "string" &&
        order_by.includes(field)
      ) {
        if (field === order_by) {
          return "ascend";
        }
        return "descend";
      } else {
        return null;
      }
    },
    [filter],
  );

  return {
    schemaList,
    filter,
    apiFilter,
    onFilterChange,
    onResetFilter,
    onChange,
    getDefaultSortOrder,
  };
};

export const formatValueWithType = <T extends Record<string, unknown>>(
  filterSchema: TFilterSchema<T>,
  value?: string | string[],
) => {
  if (!value || !filterSchema) return;
  if (filterSchema.type) {
    try {
      return formatType[filterSchema.type](value as string);
    } catch (error) {
      return;
    }
  }
};
