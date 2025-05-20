import { fetchAPI } from '@/api/fetcher';
import type { PaginationResult, Sentence } from '@/types';

const SENTENCE_PAGE_LIMIT = 24;

const getUserLikes = async (page: string) => {
  return fetchAPI<PaginationResult<Sentence>>(
    `/users/me/likes?page=${page}&limit=${SENTENCE_PAGE_LIMIT}`,
    { next: { revalidate: 300, tags: ['sentence-list'] } },
  );
};

export default getUserLikes;
