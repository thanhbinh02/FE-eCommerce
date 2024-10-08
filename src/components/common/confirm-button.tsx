import { FC, ReactNode } from 'react';

import { Popconfirm, PopconfirmProps } from 'antd';

type Props = PopconfirmProps & {
  button: ReactNode;
};

const ConfirmButton: FC<Props> = ({
  title = 'Bạn có chắc chắn thực hiện?',
  okText = 'Đồng ý',
  cancelText = 'Hủy',
  button,
  ...props
}) => {
  return (
    <Popconfirm
      title={title}
      okText={okText}
      cancelText={cancelText}
      {...props}
    >
      {button}
    </Popconfirm>
  );
};

export default ConfirmButton;
