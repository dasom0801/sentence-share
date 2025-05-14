import type { User } from '@/types';

import { fetchAPI } from './fetcher';

export const getUser = async () => {
  return fetchAPI<User>('/users/me', { cache: 'no-store' });
};

export const updateUser = async (data: Record<string, any>) => {
  return fetchAPI<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};
