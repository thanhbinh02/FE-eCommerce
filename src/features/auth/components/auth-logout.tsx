import React from "react";

import { Modal } from "antd";

import { useLogoutMutation } from "../hooks/use-auth-query";

const AuthLogout: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();

  const { mutate } = useLogoutMutation();

  const confirm = () => {
    void modal.confirm({
      title: "Bạn muốn đăng xuất tài khoản?",
      okText: "Xác nhận",
      cancelText: "Hủy bỏ",
      onOk: mutate,
    });
  };

  return (
    <div>
      <div onClick={confirm} aria-hidden="true">
        Đăng xuất
      </div>
      {contextHolder}
    </div>
  );
};

export default AuthLogout;
