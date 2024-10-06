import { QueryFunction } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

import { axiosClient } from "@/provider/axios-provider";

export const abortAxiosGet =
  <T, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): QueryFunction<T> =>
  ({ signal }) =>
    axiosClient.get(url, {
      signal,
      ...config,
    });
