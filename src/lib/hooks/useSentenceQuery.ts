import { useQuery } from '@tanstack/react-query';
import { sentenceQueries } from '@/queries';

const useSentenceQuery = (sentenceId?: string) => {
  return useQuery(sentenceQueries.detail({ sentenceId }));
};

export default useSentenceQuery;
