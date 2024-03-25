import { useQuery } from '@tanstack/react-query';
import { userQueries } from '@/queries';
import { UserListRequestParams } from '@/lib/api/types';

export const useUserLikes = (params: UserListRequestParams) =>
  useQuery(userQueries.likeList(params));
