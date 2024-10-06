import { InputNumberProps } from 'antd';
import { InputProps } from 'antd/lib/input';

import {
  formatDecimalNumber,
  formatValueToNumber,
  parserValueToNumber,
} from './number';

export const showCount = (max: number): InputProps['showCount'] => ({
  formatter: ({ count }) => `${count}/${max}`,
});

export const formatInputNumber: Pick<InputNumberProps, 'formatter' | 'parser'> =
  {
    formatter: formatValueToNumber as InputNumberProps['formatter'],
    parser: parserValueToNumber,
  };

export const formatDecimalInputNumber: typeof formatInputNumber = {
  formatter: (value) =>
    value === '' ? '' : formatDecimalNumber(value as number),
  parser: parserValueToNumber,
};
