import { ReactElement } from "react";

import { ConfigProvider } from "antd";

import { COLOR } from "@/data/constant";

type Props = {
  children: ReactElement;
};

function LayoutConfigProvider({ children }: Props) {
  return (
    <ConfigProvider
      componentSize="middle"
      theme={{
        token: {
          colorPrimary: COLOR["PRIMARY"],
          fontFamily: "Roboto",
        },
        components: {
          Modal: {
            zIndexPopupBase: 1070,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default LayoutConfigProvider;
