import {
  isArray,
  isEqual,
  isNull,
  isObject,
  mapValues,
  omitBy,
  transform,
} from "lodash";

export const removeUndefinedObject = (obj: { [key: string]: unknown }) =>
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);

export const removeNullObject = (obj: Record<string, unknown>) =>
  omitBy(obj, isNull);

export const trimObject = (obj: Record<string, unknown>) => {
  return mapValues(obj, (value) => {
    return typeof value === "string" ? value.trim() : value;
  });
};

type PlainObject = Record<string, unknown>;

export function differentObject<T extends PlainObject>(
  object: T,
  base?: T,
): Partial<T> {
  function changes(object: T, base?: T): Partial<T> {
    if (!base) return object;
    return transform(object, (result: Partial<T>, value: unknown, key) => {
      if (!isEqual(value, base[key])) {
        if (isArray(value))
          result[key as keyof T] = value as T[keyof T] | undefined;
        else {
          if (value || base[key])
            result[key as keyof T] =
              !(value instanceof Date) && isObject(value) && isObject(base[key])
                ? (changes(value as T, base[key] as T) as
                    | T[keyof T]
                    | undefined)
                : (value as T[keyof T] | undefined);
        }
      }
    });
  }
  return changes(object, base);
}
