import { useMutation } from '@tanstack/react-query';
import { toggleSentenceLike } from '../../../lib/api';
import { toast } from 'react-toastify';

const MUTATION_KEY = ['[PUT]/api/sentence/like'];

const mutationFn = async (id: string) => (await toggleSentenceLike(id)).data;

export const useToggleSentenceLike = (
  onSuccess?: (sentence: Sentence) => void
) => {
  return useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: (id: string) => mutationFn(id),
    onSuccess: (sentence: Sentence) => {
      const successMessage = sentence.isLiked
        ? '좋아한 문장에 추가했습니다.'
        : '좋아한 문장에서 제외했습니다.';
      toast.success(successMessage);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(sentence);
      }
    },
  });
};
