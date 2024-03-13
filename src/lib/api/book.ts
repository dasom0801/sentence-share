import queryString from 'query-string';
import { axios } from '.';

export type GetBookSentenceParams = {
  id?: string;
} & PageParams;

export const getBookSentence = async (params: GetBookSentenceParams) => {
  const { id, ...rest } = params;
  const query = queryString.stringify(rest);
  return await axios.get<PaginationResult<Sentence>>(
    `/api/book/${id}/sentences?${query}`
  );
};
