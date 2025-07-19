import { fetchAPI } from '@/api/fetcher';
import type { UpdateSentenceParams } from './type';

const updateSentence = async ({ id, content, book }: UpdateSentenceParams) => {
  return fetchAPI(`/sentences/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ content, book }),
  });
};

export default updateSentence;
