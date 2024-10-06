import { TFilterSchema } from "@/features/filter";
import {
  CreateRangeParams,
  EditRangeParams,
  PageParams,
  SortParam,
} from "@/ts";

export const DEFAULT_PAGINATION = {
  page: 1,
  page_size: 10,
};

export const FILTER_SCHEMA_PAGE_LIST: TFilterSchema<PageParams>[] = [
  {
    name: "page",
    type: "number",
  },
  {
    name: "page_size",
    type: "number",
  },
];

export const FILTER_SORT_LIST: TFilterSchema<SortParam> = {
  name: "order_by",
  type: "string",
};

export const COMMON_FILTER_LIST: TFilterSchema<SortParam & PageParams>[] = [
  {
    name: "page",
    type: "number",
  },
  {
    name: "page_size",
    type: "number",
  },
  {
    name: "order_by",
    type: "string",
  },
];

export const FILTER_CREATE_RANGE = (
  name: string,
): TFilterSchema<CreateRangeParams>[] => [
  {
    name: "create_at_from",
    type: "date",
    element: "date",
    placeholder: `${name} từ`,
    toDateName: "create_at_to",
  },
  {
    name: "create_at_to",
    type: "date",
    element: "date",
    placeholder: `${name} đến`,
    fromDateName: "create_at_from",
  },
];

export const FILTER_EDIT_RANGE = (
  name: string,
): TFilterSchema<EditRangeParams>[] => [
  {
    name: "edited_at_from",
    type: "date",
    element: "date",
    placeholder: `${name} từ`,
    toDateName: "edited_at_to",
  },
  {
    name: "edited_at_to",
    type: "date",
    element: "date",
    placeholder: `${name} đến`,
    fromDateName: "edited_at_from",
  },
];
