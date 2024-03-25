import { useInfiniteQuery } from '@tanstack/react-query';
import { sentenceQueries } from '@/queries';

const useBookSearchQuery = (query: string) =>
  useInfiniteQuery(sentenceQueries.bookSearch(query));

export default useBookSearchQuery;
