import { queryOptions } from '@tanstack/react-query';

import {
  getBook,
  getBookSentence,
  getUserLike,
  getUserSentence,
} from '@/lib/api';
import { BookSentenceListParams, UserListRequestParams } from '@/lib/api/types';

export const userQueries = {
  all: () => ['user'],
  me: () => [...userQueries.all(), 'me'],
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
