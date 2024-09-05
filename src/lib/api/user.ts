import querystring from 'query-string';
import axios, { fetchAPI } from './api';
import { UserListRequestParams } from './types';

export const getUser = async () => {
  return fetchAPI<User>('/api/user/me');
};

export const updateUser = async (data: Record<string, any>) => {
  return await axios.put<User>('/api/user/me', data);
};

export const deleteUser = async () => {
  return (await axios.delete('/api/user/withdrawal')).data;
};

export const getUserSentence = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return fetchAPI<PaginationResult<Sentence>>(
    `/api/user/${userId}/sentence?${query}`,
  );
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
