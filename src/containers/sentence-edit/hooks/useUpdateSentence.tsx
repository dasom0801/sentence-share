import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UpdateSentenceParams, updateSentence } from '@/lib/api';

const mutationKey = ['UpdateSentence'];
const mutationFn = async (params: UpdateSentenceParams) => {
  return (await updateSentence(params)).data;
};

const useUpdateSentence = ({
  onSuccess,
}: {
  onSuccess?: (result: Sentence) => void;
}) => {
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: ({ result }) => {
      toast.success('문장을 수정했습니다.');
      if (typeof onSuccess === 'function') {
        onSuccess(result);
      }
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export default useUpdateSentence;
