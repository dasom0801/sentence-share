import { BookSearchParams, searchBook } from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const BookSearchQeuryKey = (query: string) => [
  '[GET/api/sentence/search/book',
  query,
];

const queryFn = async (params: BookSearchParams) => {
  return (await searchBook(params)).data;
};

const useBookSearchQuery = (query: string) => {
  return useInfiniteQuery({
    queryKey: BookSearchQeuryKey(query),
    queryFn: ({ pageParam }) => queryFn({ query, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (result, allPages) =>
      allPages.length < result.toal ? result.page + 1 : null,
    enabled: !!query.length,
  });
};

export default useBookSearchQuery;
