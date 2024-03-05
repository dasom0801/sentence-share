import querystring from 'query-string';
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

export type UserSentenceRequestParams = { userId?: string } & PageParams;

export const getUserSentence = async (params: UserSentenceRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify({ queryPrams });
  return await axios.get<PaginationResult<Sentence>>(
    `/api/user/${userId}/sentence?=${query}`
  );
};

export type UserLikeRequestParams = { userId?: string } & PageParams;
export const getUserLike = async (params: UserLikeRequestParams) => {
  const { userId, ...queryPrams } = params;
  const query = querystring.stringify({ queryPrams });
  return await axios.get<PaginationResult<Sentence>>(
    `/api/user/${userId}/like?=${query}`
  );
};
