import { fetchAPI } from '@/api/fetcher';
import type { PaginationResult, Sentence } from '@/types';

const SENTENCE_PAGE_LIMIT = 24;
const getUserSentences = async (page: string) => {
  return fetchAPI<PaginationResult<Sentence>>(
    `/users/me/sentences?page=${page || 1}&limit=${SENTENCE_PAGE_LIMIT}`,
    {
      cache: 'no-store',
    },
  );
};
export default getUserSentences;
