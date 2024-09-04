'use client';

import { useCallback } from 'react';
import { Pagination as MuiPagination } from '@/lib/utils/mui';
import usePagination from '@/lib/hooks/usePagination/index';
import classes from './index.module.scss';

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