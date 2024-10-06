import { Image, Layout, Typography } from "antd";
import { Link } from "react-router-dom";

import UserInfo from "./user-info";
import { COLOR } from "@/data/constant";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="bg-inherit">
      <div
        className="fixed inset-x-0 z-[1060] flex items-center justify-between h-16 pr-4"
        style={{
          backgroundColor: COLOR.WHITE,
        }}
      >
        <Link to={"/"} className="flex items-center">
          <div className="flex gap-2 items-center [&_.ant-image]:flex ml-4">
            <Image
              width={100}
              preview={false}
              src="/logo.png"
              alt="Brand logo"
              className="!bg-white p-1 rounded-md"
            />
            <Typography className="text-lg font-bold ">ADMIN PANEL</Typography>
          </div>
        </Link>

        <UserInfo />
      </div>
    </Header>
  );
};

export default HeaderComponent;
