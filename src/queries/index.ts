import { queryOptions } from '@tanstack/react-query';

import { getUserLike, getUserSentence } from '@/lib/api';
import { UserListRequestParams } from '@/lib/api/types';

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
};
