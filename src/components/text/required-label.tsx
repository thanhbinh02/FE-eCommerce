import { FC, ReactNode } from 'react';

import RequiredIcon from './required-icon';

type Props = {
  label: ReactNode;
};

const RequiredLabel: FC<Props> = ({ label }) => {
  return (
    <>
      {label} <RequiredIcon />
    </>
  );
};

export default RequiredLabel;
