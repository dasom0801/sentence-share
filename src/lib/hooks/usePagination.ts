import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchParamsObject } from '../utils';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = useCallback(
    (page: number) => {
      const searchPramsObject = getSearchParamsObject(searchParams);
      setSearchParams({ ...searchPramsObject, page: page.toString() });
    },
    [searchParams, setSearchParams],
  );

  return { page: Number(searchParams.get('page')) || 1, setPage };
};

export default usePagination;
