import {
  BodyCreatePassword,
  BodyLogin,
  BodyRefreshOTP,
  BodyResetPassword,
  BodyVerifyOTP,
  ResponseLogin,
  ResponseRefreshOTP,
  ResponseResetPassword,
  ResponseVerifyOTP,
  TProfile,
} from "./types";
import { axiosClient } from "@/provider/axios-provider";

const baseUrl = "v1/auth";

const authApi = {
  login: (data: BodyLogin): Promise<ResponseLogin> =>
    axiosClient.post(`${baseUrl}/sign-in`, data),

  verityOTP: (data: BodyVerifyOTP): Promise<ResponseVerifyOTP> =>
    axiosClient.post(`${baseUrl}/verify-otp`, data),

  refreshOTP: (data: BodyRefreshOTP): Promise<ResponseRefreshOTP> =>
    axiosClient.post(`${baseUrl}/refresh-otp`, data),

  resetPassword: (data: BodyResetPassword): Promise<ResponseResetPassword> =>
    axiosClient.post(`${baseUrl}/reset-password`, data),

  createPassword: (data: BodyCreatePassword) =>
    axiosClient.post(`${baseUrl}/create-password`, data),

  logout: () => axiosClient.post(`${baseUrl}/sign-out`),

  profile: () => axiosClient.get<TProfile>(`${baseUrl}/my-profile`),
};

export default authApi;
