import type { Sentence } from '@/types';

import { fetchAPI } from './fetcher';

type SentenceDetailParams = {
  sentenceId?: string;
};

export const getSentence = async ({ sentenceId }: SentenceDetailParams) => {
  return fetchAPI<Sentence>(`/sentences/${sentenceId}`, {
    next: { revalidate: 300, tags: [`sentence-${sentenceId}`] },
  });
};
