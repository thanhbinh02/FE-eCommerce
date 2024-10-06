import { Dayjs } from "dayjs";

import { CustomerGender } from "./customer-enum";
import { ChangeTypeOfKeys } from "@/ts";

export type CustomerType = {
  fullName: string;
  bio?: string;
  gender: CustomerGender;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  password: string;
  id: number;
};

export type CustomerForm = ChangeTypeOfKeys<CustomerType, "dateOfBirth", Dayjs>;

export type CustomerBody = Partial<Omit<CustomerType, "id">>;

export type UpdatePasswordBody = {
  password: string;
  newPassword: string;
};
