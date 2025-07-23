import { useMutation } from '@tanstack/react-query';

import { useUserStore } from '@/store/user';
import { ApiResponse } from '@/types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { toggleSentenceLike } from '../api';
import { LikeApiResponse } from '../api/toggleSentenceLike';

type UseLikeProps = {
  id: string;
  initialLiked: boolean;
};

export function useLike({ id, initialLiked }: UseLikeProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const isLogin = useUserStore((state) => state.isLogin);

  const mutation = useMutation({
    mutationFn: async (currentLikedState: boolean) => {
      return await toggleSentenceLike(id, currentLikedState);
    },
    onMutate: async (currentLikedState: boolean) => {
      // API 응답 전 UI 상태 변경
      const newLikedState = !currentLikedState;
      setIsLiked(newLikedState);
      // 롤백을 위해 이전 상태 반환
      return { previousLikedState: currentLikedState };
    },
    onError: (error, variables, context) => {
      // 이전 상태로 롤백
      if (context?.previousLikedState !== undefined) {
        setIsLiked(context.previousLikedState);
      }

      console.error('Like Toggle Error:', error);
      toast('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
    onSuccess: (response: ApiResponse<LikeApiResponse>) => {
      // API 응답으로 최종 상태 업데이트
      setIsLiked(response.data.isLiked);
    },
  });

  const handleLikeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // 로그인하지 않은 경우 요청을 보내지 않는다.
    if (!isLogin) {
      toast.error('로그인 후에 이용해주세요.');
      return;
    }

    mutation.mutate(isLiked);
  };

  return {
    isLiked,
    handleLikeToggle,
    isLoading: mutation.isPending,
  };
}
