import { axios } from '.';
import { getBearerToken } from '../../utils';

export const getUser = async () => {
  const authorization = getBearerToken();
  return await axios.get<User>('/api/user/me', {
    headers: {
      authorization,
    },
  });
};

export const updateUser = async (data: Record<string, any>) => {
  const authorization = getBearerToken();
  return await axios.put<User>('/api/user/me', data, {
    headers: {
      authorization,
    },
  });
};
