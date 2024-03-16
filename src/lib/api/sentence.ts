import queryString from 'query-string';
import axios from './api';

export const getSentences = async (params: APIRequestParams) => {
  params.limit = params.limit ?? 12;
  const query = queryString.stringify(params);
  return (await axios.get<PaginationResult<Sentence>>(`/api/sentence?${query}`))
    .data;
};

export const toggleSentenceLike = async (id: string) => {
  return await axios.put(`/api/sentence/${id}/like`);
};

export const getSentence = async (id: string) => {
  return await axios.get<Sentence>(`/api/sentence/${id}`);
};

export const deleteSentence = async (id: string) => {
  return await axios.delete(`/api/sentence/${id}`);
};

export type CreateSentenceParams = {
  book: Book;
  content: string;
};
export const createSentence = async ({
  content,
  book,
}: CreateSentenceParams) => {
  return await axios.post('/api/sentence', {
    content,
    book,
  });
};

export type UpdateSentenceParams = CreateSentenceParams & { id: string };
export const updateSentence = async ({
  id,
  content,
  book,
}: UpdateSentenceParams) => {
  return await axios.put(`/api/sentence/${id}`, {
    content,
    book,
  });
};

export type BookSearchParams = {
  query: string;
  page: number;
};

export const searchBook = async ({ query, page = 1 }: BookSearchParams) => {
  return await axios.get(
    `/api/sentence/search/book?query=${query}&page=${page}`
  );
};
