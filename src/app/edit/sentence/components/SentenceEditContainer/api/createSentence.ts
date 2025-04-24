import { fetchAPI } from '@/api/fetcher';
import type { CreateSentenceParams } from './type';

const createSentence = async ({ content, book }: CreateSentenceParams) => {
  return fetchAPI('/sentences', {
    method: 'POST',
    body: JSON.stringify({ book, content }),
  });
};

export default createSentence;
