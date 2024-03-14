import querystring from 'query-string';
import { axios } from '.';

export const getUser = async () => {
  return await axios.get<User>('/api/user/me');
};

export const updateUser = async (data: Record<string, any>) => {
  return await axios.put<User>('/api/user/me');
};

export const deleteUser = async () => {
  return (await axios.delete('/api/user/withdrawal')).data;
};

export type UserSentenceRequestParams = {
  userId?: string;
  category: 'sentence' | 'book' | 'user';
} & PageParams;

export const getUserSentence = async (params: UserSentenceRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return await axios.get<PaginationResult<Sentence>>(
    `/api/user/${userId}/sentence?=${query}`
  );
};

export type UserLikeRequestParams = { userId?: string } & PageParams;
export const getUserLike = async (params: UserLikeRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return await axios.get<PaginationResult<Sentence>>(
    `/api/user/${userId}/like?=${query}`
  );
};
