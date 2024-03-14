import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { getSentences } from '@/lib/api';

export const queryKey = ({
  page,
  limit = 12,
}: PageParams): [string, PageParams] => ['/api/sentence', { page, limit }];
const queryFn = async (
  contenxt: QueryFunctionContext<[string, PageParams]>
) => {
  const {
    queryKey: [_, params],
  } = contenxt;

  return (await getSentences(params)).data;
};

const useSentenceQuery = ({ page, limit = 12 }: PageParams) => {
  return useQuery({
    queryKey: queryKey({ page, limit }),
    queryFn,
  });
};

export default useSentenceQuery;
