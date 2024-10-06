import { createQueryKeys } from "@lukemorales/query-key-factory";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { CUSTOMERS_PATH } from "../customer-constant";
import customerApi from "../services/customer-api";
import { ResponseError } from "@/ts";

const customer = createQueryKeys("customer", {
  list: {
    queryKey: null,
    queryFn: customerApi.getList(),
  },
  details: (id: number) => ({
    queryKey: [id],
    queryFn: customerApi.getDetails(id),
  }),
});

export const useGetCustomerListQuery = () => {
  return useQuery({
    ...customer.list,
    placeholderData: keepPreviousData,
  });
};

export const useGetCustomerDetailsQuery = (id?: number) => {
  return useQuery({
    ...customer.details(id!),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
};

export const useUpdateCustomerMutation = (id?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.update(id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: customer.details._def,
      });
      void message.success("Cập nhật thông tin khách hàng thành công");
    },
    onError: (error: ResponseError) => {
      void message.error(error.response?.data.message);
    },
  });
};

export const useCreateCustomerMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: customerApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: customer.list.queryKey,
      });
      void message.success("Tạo khách hàng thành công");
      void navigate(CUSTOMERS_PATH);
    },
    onError: (error: ResponseError) => {
      void message.error(error.response?.data.message);
    },
  });
};

export const useUpdatePasswordCustomerMutation = (id?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customerApi.updatePassword(id!),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: customer.details._def,
      });
      void message.success("Cập nhật thông tin mật khẩu thành công");
    },
    onError: (error: ResponseError) => {
      void message.error(error.response?.data.message);
    },
  });
};
