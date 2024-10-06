/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ReactNode } from "react";

import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { ResponseVerifyOTP } from "@/features/auth";
import { useAppLocalStorage } from "@/features/local-storage";
import { getLocalStorage, setLocalStorage } from "@/utils";

type Props = {
  children: ReactNode;
};

let axiosClient: AxiosInstance;
let isRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const addSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newAccessToken: string) => {
  refreshSubscribers.forEach((callback) => {
    return callback(newAccessToken);
  });
  refreshSubscribers = [];
};

const AxiosProvider = ({ children }: Props) => {
  const { removeTokens } = useAppLocalStorage();

  axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptors
  // Add a request interceptor
  axiosClient.interceptors.request.use(
    function (config) {
      const tokens = getLocalStorage("tokens");
      if (tokens) {
        config.headers["Authorization"] = "Bearer " + tokens.access_token;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axiosClient.interceptors.response.use(
    function (response) {
      return response.data;
    },
    async function (error: AxiosError) {
      const originalRequest = error.config!;

      if (error?.response?.status === 401) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            addSubscriber((newAccessToken: string) => {
              originalRequest.headers["Authorization"] =
                "Bearer " + newAccessToken;
              resolve(axiosClient(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const tokens = getLocalStorage("tokens");

          const response: AxiosResponse<ResponseVerifyOTP> = await axios.post(
            `${import.meta.env.VITE_API_URL}v1/auth/refresh-token`,
            {
              refresh_token: tokens!.refresh_token,
            },
            {
              headers: {
                Authorization: `Bearer ${tokens!.access_token}`,
              },
            },
          );

          const newAccessToken = response.data.data.access_token;

          setLocalStorage("tokens", response.data.data);

          onRefreshed(newAccessToken);
          isRefreshing = false;

          originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

          return axiosClient(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          removeTokens();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return <>{children}</>;
};

export default AxiosProvider;
export { axiosClient };
