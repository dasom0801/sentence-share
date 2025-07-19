import type { Book } from '@/types';

export type CreateSentenceParams = {
  book: Book;
  content: string;
};
export type UpdateSentenceParams = CreateSentenceParams & { id: string };
