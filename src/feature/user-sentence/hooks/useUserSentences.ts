import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@/queries';
import { UserListRequestParams } from '@/lib/api/types';

export const useUserSentences = (params: UserListRequestParams) =>
  useQuery(userQueries.sentenceList(params));
