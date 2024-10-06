import { Form } from "antd";

import { formatDateToString } from "./date";
import { ColorSelect } from "@/components";
import { DEFAULT_FORMAT_TIME } from "@/data/constant";
import { DescriptionsRecord, Status } from "@/ts";

export const descriptionTimestamp = <T extends Record<string, unknown>>({
  data,
  label,
  value,
  formatType = DEFAULT_FORMAT_TIME,
}: {
  data: T | undefined;
  label: string;
  value?: string;
  formatType?: string;
}): DescriptionsRecord => ({
  isShow: !!data,
  label,
  element: <>{formatDateToString(value, formatType)}</>,
});

export const descriptionCreatedAt = <T extends Record<"createdAt", string>>(
  data: T | undefined,
  formatType?: string
): DescriptionsRecord =>
  descriptionTimestamp({
    data,
    label: "Thời điểm tạo",
    value: data?.createdAt,
    formatType,
  });

export const descriptionUpdatedAt = <T extends Record<"updatedAt", string>>(
  data: T | undefined,
  formatType?: string
): DescriptionsRecord =>
  descriptionTimestamp({
    data,
    label: "Thời điểm cập nhật lần cuối",
    value: data?.updatedAt,
    formatType,
  });

export const descriptionId = <T extends Record<string, unknown>>(
  data: T | undefined
): DescriptionsRecord => ({
  isShow: !!data,
  label: "Name",
  element: "id",
});

export const descriptionStatus = <T extends Record<"status", number>>(
  data: T | undefined,
  options: Status[],
  disabled?: boolean
): DescriptionsRecord => ({
  isShow: !!data,
  label: "Trạng thái",
  element: (
    <Form.Item name="status">
      <ColorSelect options={options} className="!w-40" disabled={disabled} />
    </Form.Item>
  ),
});
