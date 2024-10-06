export type TLocalStorage = {
  token?: string | null;
};

export type TResetToken = {
  value: string;
  isForgotPassword: boolean;
  refreshExpiredAt: string;
  email: string;
};
