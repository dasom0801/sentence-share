import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy, SortOrder } from '@/types/enum';

import {
  getSearchParamsObject,
  getSortByValue,
  getSortOrderValue,
} from '../utils';

const useSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState<SortType>({
    sortBy: SortBy.CreatedAt,
    sortOrder: SortOrder.DESC,
  });
  const [initial, setInitial] = useState(true);
  // params가 바뀌면 state에 반영
  useEffect(() => {
    setSearchParams((prev: URLSearchParams) => {
      // params가 있는 주소로 접속한 경우 state의 초기값으로 params를 변경하지 않기 위함.
      if (initial) {
        setInitial(false);
        return prev;
      }
      const prevParams = getSearchParamsObject(prev);
      const { sortBy, sortOrder } = sort;
      if (
        prevParams.sortBy !== sortBy ||
        getSortOrderValue(prevParams.sortOrder) !== sortOrder
      ) {
        return { ...prevParams, sortBy, sortOrder: `${sortOrder}` };
      }

      return prev;
    });
  }, [sort]);

  useEffect(() => {
    // 상태가 변경될 때 params 업데이트
    const params = getSearchParamsObject(searchParams);
    if (
      !sort ||
      params.sortBy !== sort?.sortBy ||
      getSortOrderValue(params.sortOrder) !== sort?.sortOrder
    ) {
      setSort({
        sortBy: getSortByValue(params.sortBy),
        sortOrder: getSortOrderValue(params.sortOrder),
      });
    }
  }, [searchParams]);

  return { sort, setSort };
};

export default useSort;
