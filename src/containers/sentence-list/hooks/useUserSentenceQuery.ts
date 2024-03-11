import { useQuery } from '@tanstack/react-query';
import { UserSentenceRequestParams, getUserSentence } from '@/lib';

const UserSentenceQueryKey = (params: UserSentenceRequestParams): any[] => [
  '[GET]/api/user/:userId/sentence',
  params,
];
const queryFn = async (params: UserSentenceRequestParams) =>
  (await getUserSentence(params)).data;

export const useUserSentenceQuery = (params: UserSentenceRequestParams) => {
  return useQuery({
    queryKey: UserSentenceQueryKey(params),
    queryFn: () => queryFn({ ...params }),
    enabled: !!params.userId,
  });
};
