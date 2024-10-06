import { FC, useRef, useState } from "react";

import { Button, Image, Spin, Upload, UploadProps, message } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdCloudUpload } from "react-icons/io";

import { COLOR } from "@/data/constant";
import { useAppLocalStorage } from "@/features/local-storage";
import { beforeUpload } from "@/utils";

const { Dragger } = Upload;

type UploadStyleProps = UploadProps & {
  height?: number;
  ratio?: number;
};

type Props = UploadStyleProps & {
  actionAPI?: string;
  isDisabled?: boolean;
  value?: string;
  onChange?: (_value: unknown) => void;
  title?: string;
};

const UploadImage: FC<Props> = ({
  actionAPI = `${import.meta.env.VITE_MEDIA_FILE_API}/v1/image/upload`,
  isDisabled,
  ratio,
  height = 256,
  value: imageURL,
  onChange,
  title,
}) => {
  const { tokens } = useAppLocalStorage();
  const onChangeRef = useRef(onChange!);

  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps<{
    data: { uri: string };
  }>["onChange"] = (info) => {
    const status = info.file.status;

    if (status === "uploading") {
      setLoading(true);
      return;
    }

    if (status === "done") {
      const uri = info.file.response?.data.uri;

      setLoading(false);

      onChangeRef.current(uri);
    } else {
      setLoading(false);
      void message.error("Tải ảnh lên thất bại");
    }
  };

  const uploadProps: UploadStyleProps = {
    accept: "image/png, image/jpg, image/jpeg, image/webp",
    action: actionAPI,
    listType: "picture-card",
    disabled: loading || isDisabled,
    headers: {
      authorization: `Bearer ${tokens?.access_token}`,
    },
    showUploadList: false,
    onChange: handleChange,
    beforeUpload: (file) => beforeUpload(message, file),
    height,
    ratio,
  };

  const handleRemove = () => {
    onChangeRef.current(undefined);
  };

  return (
    <>
      {imageURL ? (
        <div className="flex-row-common items-center">
          <Spin spinning={loading}>
            <div className="min-h-[100px] min-w-[100px]">
              <Image alt="Ảnh" src={imageURL} height={100} />
            </div>
          </Spin>
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
          <div className="flex-col-common ">
            <span>
              <IoMdCloudUpload size={44} color={COLOR.PRIMARY} />
            </span>
            <span
              className="ant-upload-text !text-xl"
              style={{ color: COLOR.PRIMARY }}
            >
              Tải hình ảnh {title}
            </span>
            <span className="ant-upload-hint !text-gray-500">
              Hoặc kéo thả hình ảnh cần tải lên vào vùng xám
            </span>
            <span className="ant-upload-hint !text-red-500">
              Hỗ trợ: PNG, JPG, JPEG, WEBP
            </span>
          </div>
        </Dragger>
      )}
    </>
  );
};

export default UploadImage;
