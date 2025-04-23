'use client';

import { usePagination } from '@/lib/hooks';
import { Pagination as MuiPagination } from '@/lib/utils/mui';
import { useCallback } from 'react';
import classes from './Pagination.module.scss';

type PaginationProps = {
  count?: number;
};

export default function Pagination({ count = 1 }: PaginationProps) {
  const { page, setPage } = usePagination();

  const handlePage = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => setPage(page),
    [setPage],
  );

  return (
    <MuiPagination
      className={classes.container}
      count={count}
      shape="rounded"
      page={page}
      onChange={handlePage}
    />
  );
}
