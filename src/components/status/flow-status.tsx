import { FC } from "react";

import { Button, Modal, Space, Typography, message } from "antd";

import { Status } from "@/ts/types";

type Props = {
  status?: number;
  handleChangeStatus?: (status: number) => void;
  statusList: Record<number, Status & { nextStatus: number[]; action: string }>;
  isChangedForm?: boolean;
  disabled?: boolean;
};
const { confirm } = Modal;

const FlowStatus: FC<Props> = ({
  status,
  handleChangeStatus,
  statusList,
  isChangedForm = false,
  disabled = false,
}) => {
  if (!status || !handleChangeStatus) return;

  const showPropsConfirm =
    (value: number, action: string, color: string) => () => {
      if (isChangedForm) {
        void message.warning("Vui lòng hủy bỏ hoặc cập nhật biểu mẫu!");
        return;
      }

      confirm({
        title: "Xác nhận thay đổi trạng thái",
        width: 500,
        content: (
          <Typography.Text>
            Bạn có chắc chắn muốn thay đổi trạng thái sang{" "}
            <Typography.Text
              style={{
                color,
              }}
              className="text-lg"
            >
              {action}
            </Typography.Text>
            {" ?"}
          </Typography.Text>
        ),
        okText: "Xác nhận",
        cancelText: "Hủy",
        onOk() {
          handleChangeStatus(value);
        },
      });
    };

  return (
    <div className="text-right">
      <Space>
        {statusList[status].nextStatus.map((nextStatus) => {
          const { value, action, color } = statusList[nextStatus];

          return (
            <Button
              disabled={disabled}
              key={nextStatus}
              style={{
                backgroundColor: color,
              }}
              onClick={showPropsConfirm(value, action, color)}
              className="!text-white"
            >
              {action}
            </Button>
          );
        })}
      </Space>
    </div>
  );
};

export default FlowStatus;
