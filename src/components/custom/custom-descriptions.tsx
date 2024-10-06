import { memo } from "react";

import { Descriptions, DescriptionsProps, Spin } from "antd";
import styled from "styled-components";

import RequiredIcon from "../text/required-icon";
import { TDescriptions } from "@/ts";

type Props = DescriptionsProps & {
  data: TDescriptions;
  spinning?: boolean;
  labelWidth?: number;
};

const CustomDescriptions = ({
  spinning = false,
  column = 1,
  bordered = true,
  data,
  labelWidth = 200,
  ...props
}: Props) => {
  return (
    <Spin spinning={spinning}>
      <DescriptionsStyle
        contentStyle={{
          width: "100%",
        }}
        {...{
          column,
          bordered,
        }}
        labelStyle={{
          width: labelWidth,
          ...props?.labelStyle,
        }}
        {...props}
        className={`reset-mb-form-item-ant ${props.className}`}
      >
        {data?.map((item) => {
          if (item.isShow === false) return null;

          return (
            <Descriptions.Item
              key={item.label}
              label={
                <>
                  <span className="!font-semibold !text-black">
                    {item.label}
                  </span>{" "}
                  {item.isRequired && <RequiredIcon />}
                </>
              }
            >
              {item.element}
            </Descriptions.Item>
          );
        })}
      </DescriptionsStyle>
    </Spin>
  );
};

export default memo(CustomDescriptions);

const DescriptionsStyle = styled(Descriptions)`
  & > .ant-descriptions-view > table {
    table-layout: fixed !important;
  }
`;
