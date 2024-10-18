import querystring from 'query-string';
import { fetchAPI } from './api';
import { UserListRequestParams } from './types';
import { signOut } from '@firebase/auth';
import { auth } from '@/lib/firebase.config';

export const getUser = async () => {
  return fetchAPI<User>('/user/me');
};

export const updateUser = async (data: Record<string, any>) => {
  return fetchAPI<User>('/user/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteUser = async () => {
  await fetchAPI('/user/withdrawal', { method: 'DELETE' });
  await signOut(auth);
};

export const getUserSentence = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return fetchAPI<PaginationResult<Sentence>>(
    `/user/${userId}/sentence?${query}`,
  );
};

export const getUserLike = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return fetchAPI<PaginationResult<Sentence>>(`/user/${userId}/like?${query}`);
};
