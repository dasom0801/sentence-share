import { useMutation } from '@tanstack/react-query';
import { deleteSentence } from '../../../lib/api';
import { toast } from 'react-toastify';

const DeleteSentenceMutationKey = ['[DELETE]/api/sentence'];
const mutationFn = async (id: string) => (await deleteSentence(id)).data;

export const useDeleteSentence = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: DeleteSentenceMutationKey,
    mutationFn,
    onSuccess: () => {
      toast.success('문장을 삭제했습니다.');
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    },
  });
};
