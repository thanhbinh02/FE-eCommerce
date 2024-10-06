import { KeyboardEvent, memo, useEffect, useMemo } from "react";

import { Col, Form, FormProps, Row } from "antd";
import { Dayjs } from "dayjs";
import { cloneDeep } from "lodash";

import FilterCard from "./filter-card";
import FilterItem from "./filter-item";
import { TFilterSchema } from "../services/types";

type Props<T extends Record<string, unknown>> = Omit<FormProps, "onChange"> & {
  filter: {
    [key: string]: string | number | Dayjs | undefined | number[];
  };
  onReset: () => void;
  schemaList: TFilterSchema<T>[];
  onChange: (_: T) => void;
  colSpan?: number;
};

const colProps = {
  xxl: 4,
  lg: 6,
  md: 8,
  sm: 12,
  xs: 24,
};

const FilterWrapper = <T extends Record<string, unknown>>({
  filter,
  onChange,
  onReset,
  schemaList,
  colSpan,
  ...props
}: Props<T>) => {
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () =>
      schemaList.reduce(
        (acc, item) => {
          if (item.defaultValue) {
            acc[item.name] = item.defaultValue;
          }
          return acc;
        },
        {} as Record<keyof T, unknown>
      ),
    [schemaList]
  );

  useEffect(() => {
    form.setFieldsValue({
      ...initialValues,
      ...filter,
    });
  }, [filter, form, initialValues]);

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  const handleFinish = (values: T) => {
    const transformValues = cloneDeep(values);
    onChange(transformValues);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      form.submit();
    }
  };

  return (
    <Form
      {...props}
      onKeyUp={handleKeyUp}
      onFinish={handleFinish}
      name="form"
      form={form}
    >
      <FilterCard onReset={handleReset} onSubmit={form.submit}>
        <Row gutter={[8, 8]}>
          {schemaList.map(({ type, defaultValue, ...item }) => (
            <Col
              key={item.name as string}
              {...(!colSpan && colProps)}
              span={colSpan}
            >
              <FilterItem {...item} form={form} />
            </Col>
          ))}
        </Row>
      </FilterCard>
    </Form>
  );
};

export default memo(FilterWrapper) as typeof FilterWrapper;
