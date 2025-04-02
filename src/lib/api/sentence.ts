import { Book, PaginationResult, Sentence } from '@/types';
import queryString from 'query-string';
import { fetchAPI } from './api';
import { SentenceDetailParams } from './types';

export const getSentences = async (params: APIRequestParams) => {
  params.limit = params.limit ?? 12;
  const query = queryString.stringify(params);
  return fetchAPI<PaginationResult<Sentence>>(`/sentences?${query}`, {
    cache: 'no-store',
  });
};

export const toggleSentenceLike = async (id: string, isLiked: boolean) => {
  if (isLiked) {
    // 좋아요 취소
    return fetchAPI(`/likes/sentence/${id}`, { method: 'DELETE' });
  } else {
    // 좋아요 추가
    return fetchAPI(`/likes`, {
      method: 'POST',
      body: JSON.stringify({ category: 'sentence', target: id }),
    });
  }
};

export const getSentence = async ({ sentenceId }: SentenceDetailParams) => {
  return fetchAPI<Sentence>(`/sentences/${sentenceId}`);
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
