import { ReactElement } from "react";

import {
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  InputNumber,
  InputProps,
  Select,
  TreeSelect,
} from "antd";
import { NamePath } from "antd/es/form/interface";
import { Dayjs } from "dayjs";

import { TFilterSchema } from "../services/types";
import { checkDisableFrom, checkDisableTo } from "@/utils";

type Props<T extends Record<string, unknown>> = Omit<
  TFilterSchema<T>,
  "type" | "defaultValue"
> & {
  form: FormInstance;
  children?: ReactElement;
  fromDateName?: string;
  toDateName?: string;
  disableAfterToday?: boolean;
};

const FilterItem = <T extends Record<string, unknown>>({
  form,
  name,
  element,
  fieldProps = {},
  formItemProps = {},
  placeholder,
  children,
  fromDateName,
  toDateName,
  disableAfterToday,
}: Props<T>) => {
  if (element !== "number") {
    (fieldProps as InputProps).allowClear ??= true;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Component: any;
  switch (element) {
    case "input":
      Component = Input;
      break;
    case "number":
      Component = InputNumber;
      break;
    case "select":
      Component = Select;
      break;
    case "tree":
      Component = TreeSelect;
      break;
    case "date":
      Component = DatePicker;

      (fieldProps as DatePickerProps).format ??= "DD/MM/YYYY HH:mm:ss";
      (fieldProps as DatePickerProps<unknown>).showTime ??= true;

      if (fromDateName) {
        (fieldProps as DatePickerProps).disabledDate = (value: Dayjs) =>
          checkDisableTo(
            value,
            form.getFieldValue(fromDateName) as Dayjs,
            disableAfterToday,
          );
      }

      if (toDateName) {
        (fieldProps as DatePickerProps).disabledDate = (value: Dayjs) =>
          checkDisableFrom(
            value,
            form.getFieldValue(toDateName) as Dayjs,
            disableAfterToday,
          );
      }
      break;
    case undefined:
      return null;
    default: {
      // this should never happen
      const neverHappen: never = element;
      return neverHappen;
    }
  }
  const commonProps = {
    name,
    fieldProps,
    formItemProps,
    placeholder,
    children,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Component,
  };

  return formItemProps.dependencies ? (
    <Form.Item dependencies={formItemProps.dependencies} noStyle>
      {({ getFieldValue }) => (
        <FieldItem
          {...commonProps}
          disabled={
            fieldProps.disabled &&
            !getFieldValue(formItemProps.dependencies as NamePath)
          }
        />
      )}
    </Form.Item>
  ) : (
    <FieldItem {...commonProps} />
  );
};

export default FilterItem;

const FieldItem = <T extends Record<string, unknown>>({
  name,
  fieldProps = {},
  formItemProps = {},
  placeholder,
  children,
  disabled,
  Component,
}: Pick<
  Props<T>,
  "name" | "fieldProps" | "formItemProps" | "placeholder" | "children"
> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
  disabled?: boolean;
}) => {
  return (
    <Form.Item className="mb-2" name={name as string} {...formItemProps}>
      <Component
        className="w-full"
        placeholder={placeholder}
        {...fieldProps}
        disabled={disabled}
      >
        {children}
      </Component>
    </Form.Item>
  );
};
