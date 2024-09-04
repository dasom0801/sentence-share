import queryString from 'query-string';
import { fetchAPI } from './api';
import { BookSentenceListParams } from './types';

export const getBook = async (bookId?: string) => {
  return fetchAPI<Book>(`/api/book/${bookId}`);
};

export const getBookSentence = async (params: BookSentenceListParams) => {
  const { bookId, ...rest } = params;
  const query = queryString.stringify(rest);
  return fetchAPI<PaginationResult<Sentence>>(
    `/api/book/${bookId}/sentences?${query}`,
  );
};
