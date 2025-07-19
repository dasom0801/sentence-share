import type { Sentence } from '@/types';

export const excludeSentenceFromList = (
  sentences: Sentence[],
  targetId: string,
) => sentences.filter(({ _id }) => targetId !== _id);
