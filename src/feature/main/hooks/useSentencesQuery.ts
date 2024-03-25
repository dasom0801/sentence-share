import { useQuery } from '@tanstack/react-query';
import { sentenceQueries } from '@/queries';

const useSentencesQuery = (params: APIRequestParams) => {
  return useQuery(sentenceQueries.list(params));
};

export default useSentencesQuery;
