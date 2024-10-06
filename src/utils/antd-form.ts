import { FormInstance } from 'antd';

export const ANTD_FORM_UTILS = {
  setFieldValue:
    (form: FormInstance): FormInstance['setFieldValue'] =>
    (name, value) => {
      form.setFieldValue(name, value);
      void form.validateFields([name]);
    },
};
