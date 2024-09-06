import { useCallback, useMemo } from 'react';

import { getSortByValue, getSortOrderValue } from '../utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const useSort = (initialValue?: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 선택한 sort를 주소에 반영
  const setSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      const [sortByValue, sortOrderValue] = value.split('=');
      const sortBy = getSortByValue(sortByValue) as string;
      const sortOrder = getSortOrderValue(sortOrderValue).toString();
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);
      router.push(pathname + '?' + params.toString());
    },
    [searchParams, pathname, router],
  );

  // 현재 선택된 sort를 문자열로 반환
  const currentSort = useMemo(() => {
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    return sortBy && sortOrder ? `${sortBy}=${sortOrder}` : initialValue;
  }, [searchParams, initialValue]);

  // API 요청을 위한 sort 값을 객체로 반환
  const sortParams = useMemo(() => {
    const sortBy = getSortByValue(searchParams.get('sortBy'));
    const sortOrder = getSortOrderValue(searchParams.get('sortOrder'));
    return { sortBy, sortOrder };
  }, [searchParams]);

  return { currentSort, sortParams, setSort };
};

export default useSort;
