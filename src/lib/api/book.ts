import queryString from 'query-string';
import axios from './api';
import { BookSentenceListParams } from './types';

export const getBook = async (bookId?: string) => {
  return (await axios.get<Book>(`/api/book/${bookId}`)).data;
};

export const getBookSentence = async (params: BookSentenceListParams) => {
  const { bookId, ...rest } = params;
  const query = queryString.stringify(rest);
  return (
    await axios.get<PaginationResult<Sentence>>(
      `/api/book/${bookId}/sentences?${query}`,
    )
  ).data;
};
