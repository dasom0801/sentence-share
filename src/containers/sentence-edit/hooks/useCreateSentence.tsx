import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CreateSentenceParams, createSentence } from '@/lib/api';

const mutationKey = ['CreateSentence'];
const mutationFn = async (params: CreateSentenceParams) => {
  return (await createSentence(params)).data;
};

const useCreateSentence = ({
  onSuccess,
}: {
  onSuccess?: (result: Sentence) => void;
}) => {
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: ({ result }) => {
      toast.success('문장을 추가했습니다.');
      if (typeof onSuccess === 'function') {
        onSuccess(result);
      }
    },
  });
};
export default useCreateSentence;
