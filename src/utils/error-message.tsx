import { message } from "antd";

import { DEFAULT_MESSAGE_ERROR } from "@/data/constant";
import { ResponseError } from "@/ts";

export type ErrorMessages<T extends string> = {
  [key in T]: string;
};

export function showErrorMessage<T extends string>(
  error: ResponseError<T>,
  obj: ErrorMessages<T>,
) {
  if (error.response?.data.message) {
    void message.error(obj[error.response?.data.message]);
  } else {
    void message.error(DEFAULT_MESSAGE_ERROR);
  }
}
