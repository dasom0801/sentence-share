import type { Book, PaginationResult, Sentence } from '@/types';
import queryString from 'query-string';
import { API_ENDPOINTS } from './constants';
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
  if (!bookId) {
    throw new Error('bookId값이 전달되지 않았습니다.');
  }
  const query = queryString.stringify(rest);
  return fetchAPI<PaginationResult<Sentence>>(
    `${API_ENDPOINTS.BOOK_SENTENCES(bookId)}?${query}`,
    { next: { revalidate: 300, tags: ['sentence-list'] } },
  );
};

export const searchBookWithKakaoAPI = async ({
  query,
  page = 1,
}: BookSearchParams) => {
  return await fetchAPI<PaginationResult<Book>>(
    `${API_ENDPOINTS.BOOK_SEARCH_KAKAO}?query=${query}&page=${page}`,
  );
};
