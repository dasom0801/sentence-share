import type { Book, PaginationResult, Sentence } from '@/types';
import queryString from 'query-string';
import { fetchAPI } from './fetcher';

type BookSentenceListParams = PageParams & {
  bookId?: string;
};

type BookSearchParams = {
  query: string;
  page: number;
};

export const getBookSentence = async (params: BookSentenceListParams) => {
  const { bookId, ...rest } = params;
  const query = queryString.stringify(rest);
  return fetchAPI<PaginationResult<Sentence>>(
    `/books/${bookId}/sentences?${query}`,
    { next: { revalidate: 300, tags: ['sentence-list'] } },
  );
};

export const searchBookWithKakaoAPI = async ({
  query,
  page = 1,
}: BookSearchParams) => {
  return await fetchAPI<PaginationResult<Book>>(
    `/books/external/kakao/search?query=${query}&page=${page}`,
  );
};
