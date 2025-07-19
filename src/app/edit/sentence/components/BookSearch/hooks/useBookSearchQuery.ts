import { sentenceQueries } from '@/queries';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useBookSearchQuery = (query: string) =>
  useInfiniteQuery(sentenceQueries.bookSearch(query));
