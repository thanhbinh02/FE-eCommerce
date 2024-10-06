import { COLOR } from "./color";
import { ConstantList } from "@/data/class";
import { EnumStatus, EnumStatusVer2 } from "@/ts";

export const STATUS = new ConstantList([
  {
    value: EnumStatus.ACTIVE,
    label: "Hoạt động",
    color: COLOR.ACTIVE,
    action: "Hoạt động",
    nextStatus: [EnumStatus.INACTIVE],
  },
  {
    value: EnumStatus.INACTIVE,
    label: "Tạm ngưng",
    color: COLOR.PAUSE,
    action: "Tạm ngưng",
    nextStatus: [EnumStatus.ACTIVE, EnumStatus.LOCKED],
  },
  {
    value: EnumStatus.LOCKED,
    label: "Đã khóa",
    color: COLOR.LOCKED,
    action: "Khóa",
    nextStatus: [],
  },
]);

export const STATUS_VER2 = new ConstantList([
  {
    value: EnumStatusVer2.ACTIVE,
    label: "Hoạt động",
    color: COLOR.ACTIVE,
    nextStatus: [EnumStatus.INACTIVE],
  },
  {
    value: EnumStatusVer2.ACTIVE,
    label: "Tạm ngưng",
    color: COLOR.PAUSE,
    nextStatus: [EnumStatus.ACTIVE],
  },
]);
