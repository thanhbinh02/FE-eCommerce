import { useCallback, useMemo } from "react";

import { groupBy, map, mapValues, pickBy } from "lodash";
import {
  URLSearchParamsInit,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

type TSearchParams = Record<string, string | string[]>;

export const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsRouter = useMemo(
    () =>
      mapValues(
        groupBy(Array.from(searchParams.entries()), 0),
        (searchEntries) => {
          const searchValues = map(searchEntries, 1);
          return searchValues.length === 1 ? searchValues[0] : searchValues;
        }
      ),
    [searchParams]
  );

  const setParamsRouter = useCallback((params?: URLSearchParamsInit): void => {
    const cleanParams = pickBy(params as TSearchParams) as TSearchParams;
    setSearchParams(createSearchParams(cleanParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanParams = () => setParamsRouter({});

  return { paramsRouter, setParamsRouter, cleanParams };
};
