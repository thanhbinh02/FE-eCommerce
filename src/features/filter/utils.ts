import dayjs, { isDayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { flow, mapValues, partialRight, pickBy } from "lodash";

dayjs.extend(utc);

// Handle when format type
export const formatType = {
  number: (value: string) => +value,
  date: (value: string) => dayjs(value),
  string: (value: string) => value,
  array(value: string[] | string) {
    return typeof value === "string" ? [this.number(value)] : value.map(Number);
  },
};

const formatValue = (v: unknown) => {
  if (typeof v === "number") return v;
  if (!v) return;
  if (typeof v === "string") return v.replace("\t", "");
  if (isDayjs(v)) return dayjs.utc(v).format("YYYY-MM-DDTHH:mm:ss[Z]");
  if (Array.isArray(v)) return v as unknown[];
};

export const formatFilterBeforeSyncURL: (
  filter: Record<string, unknown>,
) => unknown = flow(partialRight(mapValues, formatValue), pickBy);
