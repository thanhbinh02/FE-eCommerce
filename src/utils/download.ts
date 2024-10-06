import { message } from "antd";
import dayjs from "dayjs";
import { omit } from "lodash";

import { axiosClient } from "@/provider/axios-provider";

const exportAPI = {
  report: (link: string, filter?: Record<string, unknown>): Promise<BlobPart> =>
    axiosClient.get(`${link}`, {
      params: omit(filter, "page_size", "page"),
      responseType: "blob",
    }),
};

type Props = {
  reportApi: string;
  reportName: string;
  filter?: Record<string, unknown>;
  setLoading: (loading: boolean) => void;
};

export const handleExport = async ({
  reportApi,
  reportName,
  filter,
  setLoading,
}: Props) => {
  try {
    setLoading(true);
    const response = await exportAPI.report(reportApi, filter);
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${formatNameFileDownload(reportName)}.xlsx`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    void message.error("Tải file thất bại");
  } finally {
    setLoading(false);
  }
};

export const formatNameFileDownload = (title: string) => {
  return `${title} - ${dayjs().format("YYYYMMDD HH:mm:ss")}`;
};
