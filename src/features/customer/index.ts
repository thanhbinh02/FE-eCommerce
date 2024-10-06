export * from "./services/customer-enum";
export * from "./services/customer-types";
export * from "./customer-constant";
export * from "./hooks/use-customer-query";
import withLazy from "@/hoc/with-lazy";

export const CustomerInfo = withLazy(
  () => import("./components/customer-info"),
);
