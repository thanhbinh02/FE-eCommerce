import { MessageInstance } from "antd/es/message/interface";
import { RcFile } from "antd/es/upload";

import { MAX_IMAGE_SIZE_MB } from "@/data/constant";

export const getBase64 = (
  img: RcFile,
  callback: (base64String: string | ArrayBuffer | null) => void
) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const isSizeExceedingLimit = (size: number, limit: number) => {
  return size / 1024 / 1024 < limit;
};

export const beforeUpload = (message: MessageInstance, file: File) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/webp";
  if (!isJpgOrPng) {
    void message.error(
      "Bạn chỉ được phép tải hình lên ở định dạng JPG/PNG/WEBP"
    );
  }

  const isFileSizeWithinLimit = isSizeExceedingLimit(
    file.size,
    MAX_IMAGE_SIZE_MB
  );
  if (!isFileSizeWithinLimit) {
    void message.error(
      `Hình ảnh phải có dung lượng nhỏ hơn ${MAX_IMAGE_SIZE_MB}MB`
    );
  }
  return isJpgOrPng && isFileSizeWithinLimit;
};
