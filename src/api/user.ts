import { auth } from '@/lib/firebase';
import type { PaginationResult, Sentence, User } from '@/types';
import { signOut } from '@firebase/auth';
import querystring from 'query-string';
import { fetchAPI } from './fetcher';
import { UserListRequestParams } from './types';

export const getUser = async () => {
  return fetchAPI<User>('/users/me');
};

export const updateUser = async (data: Record<string, any>) => {
  return fetchAPI<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteUser = async () => {
  await fetchAPI('/users/withdrawal', { method: 'DELETE' });
  await signOut(auth);
};

export const getUserSentence = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return fetchAPI<PaginationResult<Sentence>>(
    `/users/${userId}/sentences?${query}`,
  );
};

export const getUserLike = async (params: UserListRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify(queryPrams);
  return fetchAPI<PaginationResult<Sentence>>(
    `/users/${userId}/likes?${query}`,
  );
};
