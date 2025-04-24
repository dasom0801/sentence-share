import { fetchAPI } from '@/api/fetcher';
import type { PaginationResult, Sentence } from '@/types';
import queryString from 'query-string';

const getSentences = async (params: APIRequestParams) => {
  params.limit = params.limit ?? 12;
  const query = queryString.stringify(params);
  return fetchAPI<PaginationResult<Sentence>>(`/sentences?${query}`, {
    cache: 'no-store',
  });
};

export default getSentences;
