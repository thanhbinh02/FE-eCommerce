import { FC } from "react";

import { Select, SelectProps } from "antd";
import styled from "styled-components";

import { Status } from "@/ts";
import { findObjInArrByKey } from "@/utils";

type Props = Omit<SelectProps, "options"> & {
  options: Status[];
};

const ColorSelect: FC<Props> = ({ options, ...props }) => {
  if (!props.value) return <span></span>;
  return (
    <StyleStatusSelect
      color={findObjInArrByKey(options, props.value)!.color}
      options={options}
      {...props}
    />
  );
};

export default ColorSelect;

type StyleProps = SelectProps & {
  color: string;
};

const StyleStatusSelect = styled((props: StyleProps) => <Select {...props} />)`
  .ant-select-selector {
    background-color: ${(props) => props.color} !important;
  }
  .ant-select-selection-item {
    font-size: 1rem;
    line-height: 1.5rem;
    color: #fff;
  }
  .ant-select-arrow {
    color: #fff;
  }
`;
