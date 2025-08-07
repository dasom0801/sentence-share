'use server';

import { getUser } from '@/api/user';
import { User } from '@/types';
import { ApiError, HttpError } from '@/utils/error';
import { cookies } from 'next/headers';

// 서버에서 쿠키 문자열 추출
export const getServerCookieHeader = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  return accessToken ? `access_token=${accessToken}` : '';
};

// 서버에서 사용자 검증 결과 타입
export interface ServerUserValidation {
  user: User | null;
  isTokenExpired: boolean;
}

/**
 * 서버에서 사용자 토큰 검증 및 정보 반환
 */
export const validateUserOnServer = async (): Promise<ServerUserValidation> => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');

  if (!token?.value) {
    return {
      user: null,
      isTokenExpired: false,
    };
  }

  try {
    const { data } = await getUser();
    return {
      user: data,
      isTokenExpired: false,
    };
  } catch (error) {
    // 토큰 만료 에러 확인
    const isTokenExpired =
      (error instanceof HttpError || error instanceof ApiError) &&
      error.status === 401 &&
      (error.code === 'TOKEN_EXPIRED' || error.code === 'INVALID_TOKEN');
    if (isTokenExpired) {
      return {
        user: null,
        isTokenExpired: true,
      };
    }

    return {
      user: null,
      isTokenExpired: false,
    };
  }
};
