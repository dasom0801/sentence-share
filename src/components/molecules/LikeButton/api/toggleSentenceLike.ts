import { fetchAPI } from '@/api/fetcher';

const toggleSentenceLike = async (id: string, isLiked: boolean) => {
  if (isLiked) {
    // 좋아요 취소
    return fetchAPI(`/likes/sentence/${id}`, { method: 'DELETE' });
  } else {
    // 좋아요 추가
    return fetchAPI(`/likes`, {
      method: 'POST',
      body: JSON.stringify({ category: 'sentence', target: id }),
    });
  }
};

export default toggleSentenceLike;
