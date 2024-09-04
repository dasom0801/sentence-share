import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  getBook,
  getBookSentence,
  getSentence,
  getSentences,
  getUser,
  getUserLike,
  getUserSentence,
  searchBook,
} from '@/lib/api';
import {
  BookSentenceListParams,
  SentenceDetailParams,
  UserListRequestParams,
} from '@/lib/api/types';
import { AxiosError } from 'axios';

export const userQueries = {
  all: () => ['user'],
  me: ({ onSuccess }: { onSuccess: (user: User) => void }) =>
    queryOptions({
      queryKey: [...userQueries.all(), 'me'],
      queryFn: async () => {
        try {
          const user = await getUser();
          onSuccess(user);
          return user;
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
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
  sentenceLists: () => [...userQueries.all(), 'sentence'],
  sentenceList: (params: UserListRequestParams) =>
    queryOptions({
      queryKey: [...userQueries.sentenceLists(), params],
      queryFn: () => getUserSentence(params),
      enabled: !!params.userId,
    }),
  likeLists: () => [...userQueries.all(), 'like'],
  likeList: (params: UserListRequestParams) =>
    queryOptions({
      queryKey: [...userQueries.likeLists(), params],
      queryFn: () => getUserLike(params),
      enabled: !!params.userId,
    }),
};

export const bookQueries = {
  all: () => ['books'],
  details: () => [...bookQueries.all(), 'detail'],
  detail: (params: Pick<BookSentenceListParams, 'bookId'>) =>
    queryOptions({
      queryKey: [...bookQueries.details(), params],
      queryFn: () => getBook(params.bookId),
      enabled: !!params.bookId,
    }),
  sentenceLists: (params: Pick<BookSentenceListParams, 'bookId'>) => [
    ...bookQueries.detail(params).queryKey,
    'sentence',
  ],
  sentenceList: (params: BookSentenceListParams) =>
    queryOptions({
      queryKey: [...bookQueries.sentenceLists(params), params],
      queryFn: () => getBookSentence(params),
      enabled: !!params.bookId,
    }),
};

export const sentenceQueries = {
  all: () => ['sentences'],
  lists: () => [...sentenceQueries.all(), 'list'],
  list: (params: APIRequestParams) =>
    queryOptions({
      queryKey: [...sentenceQueries.lists(), params],
      queryFn: () => getSentences(params),
    }),
  details: () => [...sentenceQueries.all(), 'detail'],
  detail: (params: SentenceDetailParams) =>
    queryOptions({
      queryKey: [...sentenceQueries.details(), params],
      queryFn: () => getSentence(params),
      enabled: !!params.sentenceId,
    }),
  bookSearch: (query: string) =>
    infiniteQueryOptions({
      queryKey: [...sentenceQueries.all(), 'book', 'search', query],
      queryFn: ({ pageParam }) => searchBook({ query, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (result, allPages) =>
        allPages.length < result.total ? result.page + 1 : null,
      enabled: !!query.length,
    }),
};
