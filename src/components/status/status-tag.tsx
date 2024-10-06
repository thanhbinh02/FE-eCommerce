import { FC } from "react";

import { Tag, TagProps } from "antd";

type Props = TagProps & {
  statusObj: {
    color: string;
    label: string;
  } | null;
};

const StatusTag: FC<Props> = ({ statusObj, ...props }) => {
  if (!statusObj) return;

  return (
    <Tag
      color={statusObj.color}
      className="min-w-[120px] text-center px-2 py-1 text-sm font-medium"
      {...props}
    >
      {statusObj.label}
    </Tag>
  );
};

export default StatusTag;
