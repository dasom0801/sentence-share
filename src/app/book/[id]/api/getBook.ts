import { fetchAPI } from '@/api/fetcher';
import type { Book } from '@/types';

const getBook = async (bookId?: string) => {
  return fetchAPI<Book>(`/books/${bookId}`);
};

export default getBook;
