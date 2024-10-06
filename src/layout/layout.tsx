import { Suspense } from "react";

import { Layout, Spin } from "antd";
import dayjs from "dayjs";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

import fallbackRender from "./error-boundary/fallback-render";
import HeaderComponent from "./header";
import MenuComponent from "./menu";

const { Content, Footer } = Layout;
const year = dayjs().format("YYYY");

const LayoutComponent = () => {
  return (
    <Layout className="h-full">
      <HeaderComponent />

      <Layout>
        <MenuComponent />
        <Layout>
          <Content className="flex flex-col px-4 pt-4">
            <ErrorBoundary fallbackRender={fallbackRender}>
              <Suspense
                fallback={
                  <div className="flex w-full h-full">
                    <Spin spinning className="m-auto" />
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </Content>
          <Footer className="text-center !py-2 z-10">
            <span>
              Copyright &copy; {year} Powered by Estuary Solutions, version{" "}
              {import.meta.env.VITE_VERSION}
            </span>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
