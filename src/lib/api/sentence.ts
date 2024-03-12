import { axios } from '.';

export const toggleSentenceLike = async (id: string) => {
  return await axios.put(`/api/sentence/${id}/like`);
};

export const deleteSentence = async (id: string) => {
  return await axios.delete(`/api/sentence/${id}`);
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
