import { getSentences } from '@/lib/api';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

export const queryKey = (params: PageParams): [string, PageParams] => [
  '/api/sentence',
  params,
];
const queryFn = async (
  contenxt: QueryFunctionContext<[string, PageParams]>
) => {
  const {
    queryKey: [_, params],
  } = contenxt;

  return (await getSentences(params)).data;
};

const useSentenceQuery = (params: PageParams) => {
  return useQuery({
    queryKey: queryKey(params),
    queryFn,
  });
};

export default useSentenceQuery;
