import dayjs, { Dayjs } from "dayjs";

import { DEFAULT_FORMAT_TIME } from "@/data/constant";

export function formatDateToString(
  date?: Dayjs | string,
  formatType = "DD/MM/YYYY",
) {
  if (!date) return "";
  return dayjs(date).format(formatType);
}

export const formatToTimeString = (date?: Dayjs | string) =>
  formatDateToString(date, DEFAULT_FORMAT_TIME);

export const disabledBeforeNow = (date: Dayjs) =>
  date.valueOf() < dayjs().valueOf();

export function checkDisableFrom(
  startDate: Dayjs,
  toDateValue: Dayjs,
  disableAfterToday = true,
) {
  if (disableAfterToday && startDate?.valueOf() > dayjs().valueOf()) {
    return true;
  }

  if (!startDate || !toDateValue) {
    return false;
  }

  return startDate.valueOf() > toDateValue.valueOf();
}

export function checkDisableTo(
  endDate: Dayjs,
  fromDateValue: Dayjs,
  disableAfterToday = true,
) {
  if (disableAfterToday && endDate?.valueOf() > dayjs().valueOf()) {
    return true;
  }

  if (!fromDateValue || !endDate) {
    return false;
  }

  return endDate.valueOf() < fromDateValue.valueOf();
}
