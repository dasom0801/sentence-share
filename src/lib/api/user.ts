import querystring from 'query-string';
import axios from './api';
import { UserListRequestParams } from './types';

export const getUser = async () => {
  return (await axios.get<User>('/api/user/me')).data;
};

export const updateUser = async (data: Record<string, any>) => {
  return await axios.put<User>('/api/user/me', data);
};

export const deleteUser = async () => {
  return (await axios.delete('/api/user/withdrawal')).data;
};

export const getUserSentences = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return (
    await axios.get<PaginationResult<Sentence>>(
      `/api/user/${userId}/sentence?${query}`,
    )
  ).data;
};

export const getUserLike = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return (
    await axios.get<PaginationResult<Sentence>>(
      `/api/user/${userId}/like?${query}`,
    )
  ).data;
};
