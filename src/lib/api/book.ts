import queryString from 'query-string';
import { fetchAPI } from './api';
import { BookSentenceListParams } from './types';

export const getBook = async (bookId?: string) => {
  return fetchAPI<Book>(`/book/${bookId}`);
};

export const getBookSentence = async (params: BookSentenceListParams) => {
  const { bookId, ...rest } = params;
  const query = queryString.stringify(rest);
  return fetchAPI<PaginationResult<Sentence>>(
    `/book/${bookId}/sentences?${query}`,
  );
};
