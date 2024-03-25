import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { toggleSentenceLike } from '../api';
import { AxiosError } from 'axios';

const mutationFn = async (id: string) => await toggleSentenceLike(id);
/**
 *
 * @param { any[] } params.updateQueryKey 목록을 갱신하기 위한 queryKey
 * @param { function } params.onSuccess mutate 성공 후에 실행할 함수
 */
const useToggleSentenceLike = (params: {
  updateQueryKey?: any[];
  onSuccess?: (sentence: Sentence) => void;
}) => {
  const { updateQueryKey, onSuccess } = params;
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['toggleSentenceLike'],
    mutationFn: (id: string) => mutationFn(id),
    onSuccess: (sentence: Sentence) => {
      const successMessage = sentence.isLiked
        ? '좋아한 문장에 추가했습니다.'
        : '좋아한 문장에서 제외했습니다.';
      toast.success(successMessage);

      if (updateQueryKey) {
        queryClient.invalidateQueries({
          queryKey: updateQueryKey,
        });
      }

      if (typeof onSuccess === 'function') {
        onSuccess(sentence);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.statusText === 'Unauthorized') {
          return toast.error('로그인 후 이용해주세요.');
        }
      }
      toast.error('문제가 발생했습니다. 다시 시도해주세요.');
    },
  });
};

export default useToggleSentenceLike;
