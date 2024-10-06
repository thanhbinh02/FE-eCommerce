import { FC, KeyboardEvent, useEffect, useState } from "react";

import { Button, Form, FormInstance } from "antd";

type Props = { form: FormInstance; text: string };

const SubmitButton: FC<Props> = ({ form, text, ...props }) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch<Record<string, string>>([], form);

  const handleKeyUp = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      form.submit();
    }
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onKeyUp={handleKeyUp}
      {...props}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
