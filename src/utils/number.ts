import { flow } from "lodash";
import numeral from "numeral";

export const formatNumber = (number?: number) => {
  if (number === undefined) return "";
  return numeral(number).format("0,0");
};

export const formatDecimalNumber = (number?: number) => {
  if (number === undefined) return "";
  return numeral(number).format("0,0.[00]");
};

export const formatNumberAbbreviation = (number?: number) => {
  if (number === undefined) return "";
  return numeral(number).format("0,0.[00]a");
};

export const parserValueToNumber = (value?: string | null) => {
  if (value === "0") return value;
  return numeral(value).value() || "";
};

export const formatValueToNumber = (value?: number | string) => {
  if (value === undefined || value === "") return "";
  return numeral(value).format("0,0");
};

export const addAffix = (affix: "%" | "đ") => (x: string | number) =>
  `${x}${affix}`;

export const formatPercent: (number?: number) => string = flow(
  formatDecimalNumber,
  addAffix("%")
);

export const formatVND: (number?: number) => string = flow(
  formatNumber,
  addAffix("đ")
);

export const convertValuesToNumbers = (
  values?: string | string[]
): number[] => {
  if (Array.isArray(values)) {
    return values.map((item) => +item);
  } else if (typeof values === "string") {
    return [+values];
  } else {
    return [];
  }
};
