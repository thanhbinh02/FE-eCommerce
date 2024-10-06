import { ReactElement } from "react";

import { Navigate } from "react-router-dom";

import { LOGIN_PATH } from "@/features/auth";
import { useAppLocalStorage } from "@/features/local-storage";

type Props = {
  children: ReactElement;
};

const PrivateRoute = ({ children }: Props) => {
  const { tokens, resetToken } = useAppLocalStorage();

  return tokens && !resetToken ? (
    children
  ) : (
    <Navigate to={LOGIN_PATH} replace />
  );
};

export default PrivateRoute;
