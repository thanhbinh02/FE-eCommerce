import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";
import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import vitePluginImp from "vite-plugin-imp";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  plugins: [
    checker({
      typescript: true,
    }),
    optimizeLodashImports(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) =>
            name !== "theme" &&
            name !== "time-picker" &&
            `antd/es/${name}/style`,
        },
        {
          libName: "lodash",
          libDirectory: "",
          camel2DashComponentName: false,
          style: () => {
            return false;
          },
        },
      ],
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
});
