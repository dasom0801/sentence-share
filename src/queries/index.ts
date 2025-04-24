import { searchBookWithKakaoAPI } from '@/api/book';
import { getUser } from '@/api/user';
import type { User } from '@/types';
import { HttpError } from '@/utils';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const userQueries = {
  all: () => ['user'],
  me: ({ onSuccess }: { onSuccess: (user: User) => void }) =>
    queryOptions({
      queryKey: [...userQueries.all(), 'me'],
      queryFn: async () => {
        try {
          const { data: user } = await getUser();
          onSuccess(user);
          return user;
        } catch (error) {
          if (error instanceof HttpError) {
            if (error.status === 401) {
              localStorage.removeItem('access_token');
            }
          }
          return null;
        }
      },
      enabled:
        !(typeof window === 'undefined') &&
        !!localStorage.getItem('access_token'),
    }),
};

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
