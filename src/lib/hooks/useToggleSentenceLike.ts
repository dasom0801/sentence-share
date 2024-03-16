import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { toggleSentenceLike } from '../api';

const MUTATION_KEY = ['[PUT]/api/sentence/like'];

const mutationFn = async (id: string) => (await toggleSentenceLike(id)).data;

const useToggleSentenceLike = (onSuccess?: (sentence: Sentence) => void) => {
  return useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: (id: string) => mutationFn(id),
    onSuccess: (sentence: Sentence) => {
      const successMessage = sentence.isLiked
        ? '좋아한 문장에 추가했습니다.'
        : '좋아한 문장에서 제외했습니다.';
      toast.success(successMessage);
      if (typeof onSuccess === 'function') {
        onSuccess(sentence);
      }
    },
  });
};

export default useToggleSentenceLike;
