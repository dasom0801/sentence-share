import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { getSentences } from '@/lib/api';

export const queryKey = (
  params: APIRequestParams
): [string, APIRequestParams] => ['/api/sentence', params];
const queryFn = async (
  contenxt: QueryFunctionContext<[string, APIRequestParams]>
) => {
  const {
    queryKey: [_, params],
  } = contenxt;
  return await getSentences(params);
};

const useSentencesQuery = (params: APIRequestParams) => {
  return useQuery({
    queryKey: queryKey(params),
    queryFn,
  });
};

export default useSentencesQuery;
