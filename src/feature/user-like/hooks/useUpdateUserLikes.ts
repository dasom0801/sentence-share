import { useQueryClient } from '@tanstack/react-query';
import { userQueries } from '@/queries';
import { UserListRequestParams } from '@/lib/api/types';

const useUpdateUserLikes = (params: UserListRequestParams) => {
  const queryClient = useQueryClient();
  const queryKey = userQueries.likeList(params).queryKey;

  return (sentence: Sentence) => {
    queryClient.setQueryData(
      queryKey,
      (result: PaginationResult<Sentence> | undefined) => {
        return {
          ...result,
          list:
            result?.list.map((liked) =>
              liked._id === sentence._id ? sentence : liked,
            ) ?? [],
        } as PaginationResult<Sentence>;
      },
    );
  };
};

export default useUpdateUserLikes;
