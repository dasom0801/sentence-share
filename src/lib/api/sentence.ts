import { ApiResponse, Book, PaginationResult, Sentence } from '@/types';
import queryString from 'query-string';
import axios, { fetchAPI } from './api';
import { BookSearchParams, SentenceDetailParams } from './types';

export const getSentences = async (params: APIRequestParams) => {
  params.limit = params.limit ?? 12;
  const query = queryString.stringify(params);
  return fetchAPI<ApiResponse<PaginationResult<Sentence>>>(
    `/sentences?${query}`,
  );
};

export const toggleSentenceLike = async (id: string) => {
  return fetchAPI<Sentence>(`/sentence/${id}/like`, { method: 'PUT' });
};

export const getSentence = async ({ sentenceId }: SentenceDetailParams) => {
  return fetchAPI<Sentence>(`/sentence/${sentenceId}`);
};

export type CreateSentenceParams = {
  book: Book;
  content: string;
};
export const createSentence = async ({
  content,
  book,
}: CreateSentenceParams) => {
  return fetchAPI('/sentence', {
    method: 'POST',
    body: JSON.stringify({ book, content }),
  });
};

export type UpdateSentenceParams = CreateSentenceParams & { id: string };
export const updateSentence = async ({
  id,
  content,
  book,
}: UpdateSentenceParams) => {
  return fetchAPI(`/sentence/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content, book }),
  });
};

export const searchBook = async ({ query, page = 1 }: BookSearchParams) => {
  return (await axios.get(`/sentence/search/book?query=${query}&page=${page}`))
    .data;
};
