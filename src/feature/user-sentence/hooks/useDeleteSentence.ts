import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteSentence } from '@/lib/api';
import { userQueries } from '@/queries';

const DeleteSentenceMutationKey = ['[DELETE]/api/sentence'];
const mutationFn = async (id: string) => (await deleteSentence(id)).data;

export const useDeleteSentence = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: DeleteSentenceMutationKey,
    mutationFn,
    onSuccess: () => {
      toast.success('문장을 삭제했습니다.');
      if (typeof onSuccess === 'function') {
        onSuccess();
        queryClient.refetchQueries({
          queryKey: userQueries.sentenceLists(),
        });
      }
    },
    onError: () => {
      toast.error('문제가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
