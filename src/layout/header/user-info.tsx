import { Avatar, Dropdown, Space, Typography } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { AiOutlineDown, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";

import { AuthLogout, useGetProfileQuery } from "@/features/auth";

const UserInfo = () => {
  const { data } = useGetProfileQuery();

  const items: ItemType[] = [
    {
      key: "1",
      danger: true,
      icon: <AiOutlineLogout />,
      label: <AuthLogout />,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
    >
      <Space className="cursor-pointer">
        <Avatar size="small" icon={<AiOutlineUser />} />
        <Typography.Text className="uppercase font-bold">
          {data?.fullname ?? "Admin"}
        </Typography.Text>
        <AiOutlineDown color="black" />
      </Space>
    </Dropdown>
  );
};

export default UserInfo;
