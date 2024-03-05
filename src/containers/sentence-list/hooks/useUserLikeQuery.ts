import { useQuery } from '@tanstack/react-query';
import { UserLikeRequestParams, getUserLike } from '../../../lib/api';

const UserLikeQueryKey = ['[GET]/api/user/:userId/like'];
const queryFn = async (params: UserLikeRequestParams) =>
  (await getUserLike(params)).data;

export const useUserLikeQuery = (params: UserLikeRequestParams) => {
  return useQuery({
    queryKey: [...UserLikeQueryKey, params],
    queryFn: () => queryFn({ ...params }),
    enabled: !!params.userId,
  });
};
