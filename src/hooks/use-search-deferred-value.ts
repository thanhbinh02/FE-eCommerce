import { useDeferredValue, useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

export const useSearchDeferredValue = () => {
  const [valueSearch, setValueSearch] = useState('');
  const debouncedValueSearch = useDeferredValue(valueSearch);

  const [searchParams] = useSearchParams();

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!isFirstMount.current) onBlur();
    else isFirstMount.current = false;
  }, [searchParams]);

  const onBlur = () => {
    setValueSearch('');
  };

  return {
    debouncedValueSearch,
    setValueSearch,
    onBlur,
  };
};
