export type ErrorMessages<T extends string> = {
  [key in T]: string;
};
