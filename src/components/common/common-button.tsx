import { ElementType, Fragment } from "react";

import { Button, ButtonProps, ConfigProvider } from "antd";
import {
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
  AiOutlineSave,
  AiOutlineSync,
  AiOutlineUndo,
  AiOutlineUpload,
} from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { Link } from "react-router-dom";

import { COLOR } from "@/data/constant";

const variants = {
  add: {
    icon: <AiOutlinePlus size={20} />,
    type: "primary",
  },
  edit: {
    icon: <AiOutlineEdit size={24} />,
    type: "primary",
  },
  delete: {
    icon: <AiOutlineDelete size={20} />,
    type: "primary",
    danger: true,
    ghost: true,
  },
  view: { icon: <AiOutlineEye size={24} />, type: "primary" },
  export: { icon: <BsDownload size={20} />, type: "primary" },
  download: { icon: <AiOutlineDownload size={20} />, type: "primary" },
  upload: { icon: <AiOutlineUpload size={20} />, type: "primary" },
  save: {
    icon: <AiOutlineSave size={20} />,
    type: "primary",
  },
  cancel: {
    icon: <AiOutlineUndo size={20} />,
    type: "primary",
    danger: true,
    ghost: true,
  },
  nothing: {
    style: {
      outline: "none",
      padding: "0px",
      border: "none",
      height: "auto",
    },
  },
  sync: { icon: <AiOutlineSync size={20} /> },
};

type Props = ButtonProps & {
  action: keyof typeof variants;
  colorPrimary?: string;
};

export default function CommonButton({
  children,
  href,
  action,
  target,
  colorPrimary = COLOR.PRIMARY,
  className,
  ...rest
}: Props) {
  const Component: ElementType = href ? Link : Fragment;

  return (
    <Component
      {...(href
        ? { to: href, target, className: "!flex !justify-center" }
        : {})}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary,
          },
        }}
      >
        <Button
          {...(variants[action] as ButtonProps)}
          {...rest}
          className={`flex ${className}`}
        >
          {children}
        </Button>
      </ConfigProvider>
    </Component>
  );
}
