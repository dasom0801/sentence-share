import { useQuery } from '@tanstack/react-query';
import { bookQueries } from '@/queries';

const useBookDetailQuery = (bookId?: string) =>
  useQuery(bookQueries.detail({ bookId }));

export default useBookDetailQuery;
