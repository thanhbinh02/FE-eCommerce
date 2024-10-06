import {
  CustomerBody,
  CustomerType,
  UpdatePasswordBody,
} from "./customer-types";
import { axiosClient } from "@/provider/axios-provider";
import { ListData } from "@/ts";
import { abortAxiosGet } from "@/utils";

const baseUrl = "/customers";

const customerApi = {
  getList: () => abortAxiosGet<ListData<CustomerType>>(baseUrl),

  getDetails: (id: number) => abortAxiosGet<CustomerType>(`${baseUrl}/${id}`),

  create: (data: CustomerBody) => axiosClient.post(baseUrl, data),

  update: (id: number) => (data: CustomerBody) =>
    axiosClient.patch(`${baseUrl}/${id}`, data),

  updatePassword: (id: number) => (data: UpdatePasswordBody) =>
    axiosClient.patch(`${baseUrl}/${id}/password`, data),
};

export default customerApi;
