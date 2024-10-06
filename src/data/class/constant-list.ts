import { keyBy } from "lodash";

export class ConstantList<T extends { label: string; value: string | number }> {
  public readonly list: T[];
  private readonly objectMap: Record<string | number, T>;

  constructor(list: T[]) {
    this.list = list;
    this.objectMap = keyBy(this.list, "value");
  }

  get object(): Record<string | number, T> {
    return this.objectMap;
  }

  getLabelByKey(value?: string | number): string {
    return value != null && value in this.objectMap
      ? this.objectMap[value].label
      : "";
  }

  getObjByKey(value?: string | number): T | null {
    return value != null && value in this.objectMap
      ? this.objectMap[value]
      : null;
  }
}
