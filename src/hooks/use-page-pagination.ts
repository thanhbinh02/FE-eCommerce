import { useCallback, useState } from 'react';

import { TablePaginationConfig } from 'antd';

import { useCustomSearchParams } from './use-custom-search-params';

const usePagePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = useCallback(({ current }: TablePaginationConfig) => {
    setCurrentPage(current!);
  }, []);

  return { currentPage, onChange } as const;
};

const useSearchParams = () => {
  const { paramsRouter, setParamsRouter } = useCustomSearchParams();

  const onChange = useCallback(
    ({ current }: TablePaginationConfig) => {
      setParamsRouter({ page: String(current) });
    },
    [setParamsRouter],
  );

  return {
    page: Number(paramsRouter.page) || 1,
    onChange,
  };
};

export const PAGINATION_HOOK = {
  usePagePagination,
  useSearchParams,
};
