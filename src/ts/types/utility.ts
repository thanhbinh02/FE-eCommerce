import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type QueryOptions<TData, TQueryData = unknown, TError = unknown> = Omit<
  UseQueryOptions<TQueryData, TError, TData, QueryKey>,
  | "queryKey"
  | "queryFn"
  | "refetchInterval"
  | "refetchOnMount"
  | "refetchOnReconnect"
  | "refetchOnWindowFocus"
  | "useErrorBoundary"
>;

export type ValueOf<T> = T[keyof T];

type NumericValues<T> = {
  [K in keyof T]: K extends string ? T[K] : never;
};

export type NumberEnumUnion<T> = NumericValues<T>[keyof NumericValues<T>];

// K is the union keyof T whose type is required,
// the remaining keys of T have the same type
export type RequiredKeys<T, K extends keyof T> = Required<
  Pick<T, Extract<keyof T, K>>
> &
  Omit<T, Extract<keyof T, K>>;

/**
 * Change the type of Keys of T from NewType
 */
export type ChangeTypeOfKeys<
  T extends object,
  Keys extends keyof T,
  NewType,
> = {
  // Loop to every key. We gonna check if the key
  // is assignable to Keys. If yes, change the type.
  // Else, retain the type.
  [key in keyof T]: key extends Keys ? NewType : T[key];
};
