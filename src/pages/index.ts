import { lazy } from "react";

export const DashboardPage = lazy(() => import("./dashboard"));

export const NotFoundPage = lazy(() => import("./not-found"));

// User
export const UsersPage = lazy(() => import("./users"));

// Customer
export const CustomersPage = lazy(() => import("./customers"));
export const CustomerDetailsPage = lazy(() => import("./customers/[id]"));
export const CreateCustomerPage = lazy(() => import("./customers/create"));
