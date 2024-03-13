import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { GetBookSentenceParams, getBookSentence } from '../api/book';

const queryKey = (
  params: GetBookSentenceParams
): [string, GetBookSentenceParams] => [`/book/:id/sentence`, params];

const queryFn = async ({
  queryKey: [, params],
}: QueryFunctionContext<[string, GetBookSentenceParams]>) => {
  return (await getBookSentence(params)).data;
};

const useBookSentenceQuery = (params: GetBookSentenceParams) => {
  return useQuery({
    queryKey: queryKey(params),
    queryFn,
    enabled: !!params.id,
  });
};

export default useBookSentenceQuery;
