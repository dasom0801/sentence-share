import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UpdateSentenceParams, updateSentence } from '@/lib/api';
import { sentenceQueries } from '@/queries';

const mutationKey = ['UpdateSentence'];
const mutationFn = async (params: UpdateSentenceParams) => {
  return (await updateSentence(params)).data;
};

const useUpdateSentence = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: ({ result: sentence }) => {
      toast.success('문장을 수정했습니다.');
      queryClient.invalidateQueries({
        queryKey: sentenceQueries.detail({ sentenceId: sentence._id }).queryKey,
      });
      navigate(`/sentence/${sentence._id}`);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export default useUpdateSentence;
