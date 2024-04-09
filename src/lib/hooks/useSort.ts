import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  getSearchParamsObject,
  getSortByValue,
  getSortOrderValue,
} from '../utils';

const useSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 선택한 sort를 주소에 반영
  const setSort = useCallback(
    (value: string) => {
      const searchPramsObject = getSearchParamsObject(searchParams);
      const [sortByValue, sortOrderValue] = value.split('=');
      const sortBy = getSortByValue(sortByValue) as string;
      const sortOrder = getSortOrderValue(sortOrderValue).toString();
      setSearchParams({ ...searchPramsObject, sortBy, sortOrder });
    },
    [searchParams, setSearchParams],
  );

  // 현재 선택된 sort를 문자열로 반환
  const currentSort = useMemo(() => {
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    return `${sortBy}=${sortOrder}`;
  }, [searchParams]);

  // API 요청을 위한 sort 값을 객체로 반환
  const sortParams = useMemo(() => {
    const sortBy = getSortByValue(searchParams.get('sortBy'));
    const sortOrder = getSortOrderValue(searchParams.get('sortOrder'));
    return { sortBy, sortOrder };
  }, [searchParams]);

  return { currentSort, sortParams, setSort };
};

export default useSort;
