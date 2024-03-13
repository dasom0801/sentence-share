import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { getSentence } from '../api';

const queryKey = (id: string | undefined): string[] =>
  id ? ['/api/sentence', id] : [];

const queryFn = async ({ queryKey }: QueryFunctionContext) => {
  const [, id] = queryKey as string[];
  return (await getSentence(id)).data;
};

const useSentenceQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: queryKey(id),
    queryFn,
    enabled: !!id,
  });
};

export default useSentenceQuery;
