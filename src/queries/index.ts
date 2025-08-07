import { searchBookWithKakaoAPI } from '@/api/book';
import { infiniteQueryOptions } from '@tanstack/react-query';

export const sentenceQueries = {
  all: () => ['sentences'],
  bookSearch: (query: string) =>
    infiniteQueryOptions({
      queryKey: [...sentenceQueries.all(), 'book', 'search', query],
      queryFn: ({ pageParam }) =>
        searchBookWithKakaoAPI({ query, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: ({ data }) => {
        const { page, totalPages } = data;
        return page < totalPages ? page + 1 : undefined;
      },
      enabled: !!query.length,
      select: (data) => {
        const pages = data.pages.map((page) => page.data);
        const books = pages.flatMap((page) => page.list);
        const lastPage = pages[pages.length - 1];

        return {
          books,
          hasNext: books.length < lastPage.total,
          currentPage: lastPage.page,
        };
      },
    }),
};
