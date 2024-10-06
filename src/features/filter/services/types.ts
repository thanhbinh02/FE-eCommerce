import {
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TreeSelectProps,
} from "antd";
import { Dayjs } from "dayjs";

// type Component
type TInput = {
  element?: "input";
  fieldProps?: InputProps;
};

type TSelect = {
  element?: "select";
  fieldProps?: SelectProps;
};

type TTreeSelect = {
  element?: "tree";
  fieldProps?: TreeSelectProps;
};

type TInputNumber = {
  element?: "number";
  fieldProps?: InputNumberProps;
};

// Type schemaFilter
type ITypeString = (TSelect | TTreeSelect | TInput) & {
  type: "string";
  defaultValue?: string;
};

type ITypeNumber = (TSelect | TTreeSelect | TInputNumber) & {
  type: "number";
  defaultValue?: number;
};

type ITypeDate = {
  type: "date";
  defaultValue?: Dayjs;
  element: "date";
  fieldProps?: DatePickerProps;
  fromDateName?: string;
  toDateName?: string;
  disableAfterToday?: boolean;
};

type ITypeArray = TSelect & {
  type: "array";
  defaultValue?: number[];
};

type IType = ITypeString | ITypeNumber | ITypeDate | ITypeArray;

export type TFilterSchema<T extends Record<string, unknown>> = IType & {
  name: keyof T;
  placeholder?: string;
  formItemProps?: FormItemProps;
  allowClear?: boolean;
};
