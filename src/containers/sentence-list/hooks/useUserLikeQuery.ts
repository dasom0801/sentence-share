import { useQuery } from '@tanstack/react-query';
import { UserLikeRequestParams, getUserLike } from '../../../lib/api';

export const UserLikeQueryKey = (params: UserLikeRequestParams): any[] => [
  '[GET]/api/user/:userId/like',
  params,
];
const queryFn = async (params: UserLikeRequestParams) =>
  (await getUserLike(params)).data;

export const useUserLikeQuery = (params: UserLikeRequestParams) => {
  return useQuery({
    queryKey: UserLikeQueryKey(params),
    queryFn: () => queryFn({ ...params }),
    enabled: !!params.userId,
  });
};
