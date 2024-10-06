import { FC, useCallback, useRef } from "react";

import { Button, message, Upload, UploadProps } from "antd";
import { RcFile } from "antd/es/upload";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";

import { COLOR } from "@/data/constant";

const { Dragger } = Upload;

type Props = {
  value?: RcFile;
  onChange?: (value: Props["value"]) => void;
};

const UploadFile: FC<Props> = ({ value, onChange }) => {
  const onChangeRef = useRef(onChange!);

  const handleFileUpload = useCallback(() => {
    if (value) {
      void message.error("Upload file thất bại!");
      return;
    }
  }, [value]);

  const handleChange: UploadProps["onChange"] = (info) => {
    try {
      if (info) {
        const { originFileObj } = info.file;

        if (originFileObj) {
          onChangeRef.current(originFileObj);
        }
      }
    } catch (error) {
      void Promise.reject("Upload file thất bại!");
    }
  };

  const handleRemove = () => {
    onChangeRef.current(undefined);
  };

  const uploadProps: UploadProps = {
    name: "file",
    accept: ".xlsx",
    maxCount: 1,
    onChange: handleChange,
    beforeUpload: handleFileUpload,
    onRemove: handleRemove,
  };

  return (
    <>
      {value ? (
        <div className="flex-row-common items-center">
          <span className="font-semibold">{value?.name}</span>{" "}
          <Button
            type="text"
            shape="circle"
            title="remove"
            onClick={handleRemove}
            icon={<AiOutlineDelete size={20} />}
            danger
          />
        </div>
      ) : (
        <Dragger {...uploadProps}>
          <p>
            <FaFileAlt size={24} color={COLOR.PRIMARY} />
          </p>
          <p className="ant-upload-text">
            Nhấp chuột hoặc kéo thả file cần tải lên vào vùng xám
          </p>
          <p className="ant-upload-hint !text-red-500">
            Nội dung tải lên phải theo đúng template. Các trường thông tin trong
            file tải lên không được để trống, nếu trường nào không có thông tin
            thì người dùng có thể nhập &quot;Unknown&quot;
          </p>
        </Dragger>
      )}
    </>
  );
};

export default UploadFile;
