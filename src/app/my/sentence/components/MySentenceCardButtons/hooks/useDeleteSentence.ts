import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteSentence } from '../api';

type UseDeleteSentenceProps = {
  onSuccess?: () => void;
};

export function useDeleteSentence({ onSuccess }: UseDeleteSentenceProps) {
  const mutation = useMutation({
    mutationFn: deleteSentence,
    onSuccess: () => {
      onSuccess?.();
      toast.success('문장을 삭제했습니다.');
    },
    onError: () => {
      toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  return {
    deleteSentence: mutation.mutate,
    isDeleting: mutation.isPending,
  };
}
