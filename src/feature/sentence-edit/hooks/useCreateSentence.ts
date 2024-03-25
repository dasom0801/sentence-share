import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CreateSentenceParams, createSentence } from '@/lib/api';

const mutationKey = ['CreateSentence'];
const mutationFn = async (params: CreateSentenceParams) => {
  return (await createSentence(params)).data;
};

const useCreateSentence = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: ({ result: sentence }) => {
      toast.success('문장을 추가했습니다.');
      navigate(`/sentence/${sentence._id}`);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export default useCreateSentence;
