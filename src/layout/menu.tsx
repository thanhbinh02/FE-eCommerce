import { useEffect, useState } from "react";

import { Layout, Menu, theme } from "antd";
import { ItemType } from "rc-menu/lib/interface";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { COLOR } from "@/data/constant";
import { useNavigationMenu } from "@/routes/navigation";
import { getArrayWithPathCode } from "@/utils";

const { Sider } = Layout;

const MenuComponent = () => {
  const { menuList } = useNavigationMenu();
  const token = theme.useToken();
  const location = useLocation();

  const [openKey, setOpenKey] = useState<string>(location.pathname);
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

  useEffect(() => {
    setOpenKey(location.pathname);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const onMenuClick = (path: string) => {
    setSelectedKey(path);
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();
    setOpenKey(key === openKey ? "" : key!);
  };

  return (
    <StyleSider
      collapsible
      width={280}
      collapsedWidth={80}
      style={{
        backgroundColor: token.token.colorBgContainer,
      }}
    >
      <Menu
        mode="inline"
        items={menuList as ItemType[]}
        selectedKeys={selectedKey ? getArrayWithPathCode(selectedKey) : []}
        openKeys={openKey ? getArrayWithPathCode(openKey) : []}
        onOpenChange={onOpenChange}
        onSelect={(k) => onMenuClick(k.key)}
      />
    </StyleSider>
  );
};

export default MenuComponent;

const StyleSider = styled(Sider)({
  ".ant-layout-sider-children": {
    overflow: "auto",
  },
  ".ant-layout-sider-trigger": {
    backgroundColor: COLOR.WHITE,
    borderTop: "1px solid #96969B",
    color: "black",
  },
});
