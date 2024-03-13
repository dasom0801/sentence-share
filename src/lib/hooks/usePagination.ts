import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page') || 1)
  );
  useEffect(() => {
    setSearchParams({ page: `${page}` });
  }, [page]);

  useEffect(() => {
    if (`${page}` !== searchParams.get('page')) {
      setPage(Number(searchParams.get('page') || 1));
    }
  }, [searchParams]);

  return { page, setPage };
};
