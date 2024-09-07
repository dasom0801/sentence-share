import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const usePagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', `${page}`);
      router.push(pathname + '?' + params.toString());
    },
    [searchParams, pathname, router],
  );

  return { page: Number(searchParams.get('page')) || 1, setPage };
};

export default usePagination;
