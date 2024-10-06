import "./app.css";
import "./styles/index.less";

import React from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";

import { LayoutConfigProvider, QueryProvider } from "./provider";
import AxiosProvider from "./provider/axios-provider";
import Routes from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AxiosProvider>
      <LayoutConfigProvider>
        <QueryProvider>
          <Routes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </LayoutConfigProvider>
    </AxiosProvider>
  </React.StrictMode>,
);
