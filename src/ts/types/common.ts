import { ReactNode } from "react";

import { DescriptionsItemProps } from "antd/es/descriptions/Item";
import { AxiosError } from "axios";

export type Status = {
  value: number;
  label: string;
  color: string;
};

export type DescriptionsRecord = {
  isShow?: boolean;
  isRequired?: boolean;
  label: string;
  element: ReactNode;
  formatType?: string;
} & Pick<DescriptionsItemProps, "span" | "contentStyle" | "labelStyle">;

export type TDescriptions = DescriptionsRecord[] | undefined;

export type TDataAddResponse = {
  id: number;
  success: boolean;
};

export type ListData<T> = {
  data: T[];
  message: string;
  offset: number;
  page_size: number;
  status_code: number;
  total_count: number;
  total_pages: number;
};

export type DetailData<T> = {
  code: number;
  data: T;
  msg: string;
  success: boolean;
};

export type TimeDetailData = {
  updatedAt: string;
  createdAt: string;
};

export type ResponseData<T> = {
  status_code: number;
  message: string;
  data: T;
};

// Get keys
// Ex: const obj = {name: "Nam", age: 12 } => type = "name" | "age"
export type FlattenKeys<T> = keyof T;

export type ResponseError<T> = AxiosError<{
  message: T;
  status_code: number;
}>;
