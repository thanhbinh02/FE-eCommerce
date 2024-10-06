import { useFilter } from "./hooks/use-filter";
import withLazy from "@/hoc/with-lazy";

export { useFilter };

export * from "./hooks/use-filter";
export type { TFilterSchema } from "./services/types";

export const FilterWrapper = withLazy(
  () => import("./components/filter-wrapper"),
);
