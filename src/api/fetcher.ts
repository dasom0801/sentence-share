import { ApiResponse } from '@/types';
import { ApiError } from '@/utils';
import { getServerCookieHeader } from '../utils/server-utils';
import { BASE_URL } from './constants';

export const fetchAPI = async <T>(
  url: string,
  init: RequestInit = {},
): Promise<ApiResponse<T>> => {
  const isServer = typeof window === 'undefined';

  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  };

  // 서버 환경에서는 쿠키를 직접 붙여야 인증됨
  if (isServer) {
    const cookieHeader = await getServerCookieHeader();
    if (cookieHeader) {
      headers['cookie'] = cookieHeader;
    }
  }

  init = {
    ...init,
    headers,
    credentials: 'include',
  };

  const response = await fetch(`${BASE_URL}${url}`, init);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new ApiError(errorBody || {});
  }

  return await response.json();
};
