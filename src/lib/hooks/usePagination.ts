import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchParamsObject } from '../utils';

const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page') || 1)
  );

  useEffect(() => {
    setSearchParams((prev) => {
      const params = getSearchParamsObject(prev);
      if (params.page !== `${page}`) {
        return { ...params, page: `${page}` };
      }
      return prev;
    });
  }, [page]);

  useEffect(() => {
    if (`${page}` !== searchParams.get('page')) {
      setPage(Number(searchParams.get('page') || 1));
    }
  }, [searchParams]);

  return { page, setPage };
};

export default usePagination;
