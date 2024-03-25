import { useQuery } from '@tanstack/react-query';
import { bookQueries } from '@/queries';
import { BookSentenceListParams } from '../api/types';

const useBookSentenceQuery = (params: BookSentenceListParams) => {
  return useQuery(bookQueries.sentenceList(params));
};

export default useBookSentenceQuery;
