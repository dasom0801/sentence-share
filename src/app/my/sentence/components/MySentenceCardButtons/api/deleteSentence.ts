import { fetchAPI } from '@/api/fetcher';

const deleteSentence = (sentenceId: string) => {
  return fetchAPI(`/sentences/${sentenceId}`, { method: 'DELETE' });
};

export default deleteSentence;
