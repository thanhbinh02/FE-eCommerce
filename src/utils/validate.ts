import { Rule } from "antd/es/form";

import { lowercaseFirstLetter } from "./string";

const validate = {
  number: [
    {
      pattern: new RegExp(/^\d+$/),
      message: "Chỉ chấp nhận kiểu số",
    },
  ],
  required: [
    {
      required: true,
      message: "Trường này là bắt buộc!",
    },
  ],
  email: [
    {
      type: "email",
      message: "Định dạng này không phải là Email!",
    },
  ],
  name: [
    {
      pattern: new RegExp(/^(?! )[\p{L} ]*(?<! )$/u), // Vietnamese
      message:
        "Tên không đươc chứa chữ số, kí tự đặc biệt, khoảng trắng ở đầu hoặc cuối",
    },
  ],
  noWhiteSpace: [
    {
      pattern: new RegExp(/^[^\s]+$/),
      message: "Không chứa khoảng trắng",
    },
  ],
  coordinate: [
    {
      pattern: new RegExp(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/),
      message: "Vui lòng nhập đúng dịnh dạng tọa độ (x,y)",
    },
  ],
  confirmPassword: [
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error("Nội dung phải trùng khớp với mật khẩu trên")
        );
      },
    }),
  ] as [Rule],
  phoneNumber: [
    {
      pattern: new RegExp(/^(\d\s*){10}$/),
      message: "Số điện thoại không đúng định dạng, vui lòng nhập lại",
    },
  ],
};

const validateFn = {
  required: (text: string) => [
    {
      required: true,
      message: `Vui lòng ${lowercaseFirstLetter(text)}`,
    },
  ],
  min: (number: number) => [
    {
      min: number,
      message: `Trường này phải có tối thiểu ${number} ký tự`,
    },
  ],
  max: (number: number) => [
    {
      max: number,
      message: `Đề xuất: Trường này không nên vượt quá ${number} ký tự!`,
      warningOnly: true,
    },
  ],
  minAndMax: (min: number, max: number) => [
    {
      min,
      max,
      message: `Trường này phải có độ dài từ ${min} đến ${max} ký tự`,
    },
  ],
  len: (number: number) => [
    {
      len: number,
      message: `Trường này phải có đúng ${number} ký tự`,
    },
  ],
};

type TypeValidateKey = keyof typeof validate;
const validator = (key: TypeValidateKey | TypeValidateKey[]): Rule[] => {
  if (Array.isArray(key)) {
    return key.reduce(
      (result: Rule[], item) => result.concat(validate[item] as Rule[]),
      []
    );
  }
  return validate[key] as Rule[];
};

export const validatorFn = <T extends keyof typeof validateFn>(key: T) =>
  validateFn[key];

export default validator;
