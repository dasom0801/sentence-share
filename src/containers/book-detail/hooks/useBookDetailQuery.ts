import { getBook } from '@/lib/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

const queryKey = (id?: string): string[] => (id ? ['[GET]/book/:id', id] : []);

const queryFn = async ({
  queryKey: [, id],
}: QueryFunctionContext<string[]>) => {
  return await getBook(id);
};

const useBookDetailQuery = (id?: string) => {
  return useQuery({
    queryKey: queryKey(id),
    queryFn,
    enabled: !!id,
  });
};

export default useBookDetailQuery;
