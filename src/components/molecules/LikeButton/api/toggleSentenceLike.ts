import { API_ENDPOINTS } from '@/api/constants';
import { fetchAPI } from '@/api/fetcher';

export type LikeApiResponse = {
  isLiked: boolean;
  target: string;
  category: string;
};

const toggleSentenceLike = async (id: string, isLiked: boolean) => {
  if (isLiked) {
    // 좋아요 취소
    return fetchAPI<LikeApiResponse>(API_ENDPOINTS.DISLIKE_SENTENCE(id), {
      method: 'DELETE',
    });
  } else {
    // 좋아요 추가
    return fetchAPI<LikeApiResponse>(API_ENDPOINTS.LIKE_SENTENCE, {
      method: 'POST',
      body: JSON.stringify({ category: 'sentence', target: id }),
    });
  }
};

export default toggleSentenceLike;
