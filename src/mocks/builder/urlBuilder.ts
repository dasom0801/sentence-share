import { BASE_URL } from '@/api/constants';

export const buildMswUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};
