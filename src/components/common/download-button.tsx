import { FC, useState } from "react";

import { ButtonProps } from "antd";

import CommonButton from "./common-button";
import { COLOR } from "@/data/constant";
import { handleExport } from "@/utils";

type Props = ButtonProps & {
  color?: string;
  buttonName?: string;
  reportApi: string;
  reportName: string;
  filter?: Record<string, unknown>;
  disabled?: boolean;
};

const DownloadButton: FC<Props> = ({
  color = COLOR.PRIMARY,
  buttonName = "Xuất báo cáo",
  reportApi,
  reportName,
  filter,
  disabled = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    void handleExport({
      reportApi: `${import.meta.env.VITE_API_URL}/${reportApi}`,
      reportName,
      filter,
      setLoading,
    });
  };

  return (
    <CommonButton
      action="export"
      colorPrimary={color}
      onClick={onClick}
      loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      {buttonName}
    </CommonButton>
  );
};

export default DownloadButton;
