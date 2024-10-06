import { useCallback } from "react";

import { FormInstance } from "antd";
import { useBoolean } from "usehooks-ts";

const useOpenModal = (form: FormInstance) => {
  const {
    value: isOpenModal,
    setTrue: setOpenModal,
    setFalse,
  } = useBoolean(false);

  const handleCloseModal = useCallback(() => {
    setFalse();
    form.resetFields();
  }, [setFalse, form]);

  return { isOpenModal, setOpenModal, handleCloseModal };
};

export default useOpenModal;
