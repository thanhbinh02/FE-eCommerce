import { ConstantBreadcrumbs } from "@/data/class";

export const USER_BASE_URL = "v1/user";
export const USERS_PATH = "/users";
export const USER_NAME = "Quản lý người dùng";

export const USER_BREADCRUMBS = new ConstantBreadcrumbs({
  baseName: USER_NAME,
  basePath: USERS_PATH,
});
