import { FC, ReactNode } from "react";

import { PopconfirmProps, Space } from "antd";

import CommonButton from "./common-button";
import ConfirmButton from "./confirm-button";

type Props = {
  isCancelDisabled?: boolean;
  isOkDisabled?: boolean;
  isOkLoading?: boolean;
  isAddType?: boolean;
  cancelText?: ReactNode;
  onOk: PopconfirmProps["onConfirm"];
  onCancel?: () => void;
  isRemoveCancel?: boolean;
};

const MainAction: FC<Props> = ({
  isCancelDisabled,
  isOkDisabled,
  isOkLoading,
  onCancel,
  onOk,
  cancelText = "Hủy bỏ",
  isAddType = false,
  isRemoveCancel = false,
}) => {
  return (
    <div className="flex justify-end">
      <Space className="p-2 rounded-lg">
        {!isRemoveCancel && (
          <ConfirmButton
            title="Bạn có chắc chắn hủy bỏ?"
            placement="topRight"
            onConfirm={onCancel}
            button={
              <CommonButton action="cancel" disabled={isCancelDisabled}>
                {cancelText}
              </CommonButton>
            }
          />
        )}
        <ConfirmButton
          title="Bạn có chắc chắn muốn thực hiện?"
          placement="topRight"
          onConfirm={onOk}
          button={
            <CommonButton
              action={isAddType ? "add" : "save"}
              disabled={isOkDisabled}
              loading={isOkLoading}
            >
              {isAddType ? "Tạo mới" : "Cập nhật"}
            </CommonButton>
          }
        />
      </Space>
    </div>
  );
};

export default MainAction;
