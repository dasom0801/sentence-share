import { User } from '@/types/user';
import { HttpError } from '@/utils/error';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import models from '../models';

/**
 * token을 통해 인증된 사용자를 찾기
 *
 */
export const getAuthenticatedUser = async (): Promise<User | null> => {
  try {
    const userId = getLoginUserId();
    return userId ? await models.User.findById(userId).lean<User>() : null;
  } catch (error) {
    console.error('사용자 정보 찾기 실패', error);
    return null;
  }
};

/**
 * JWT 검증 함수
 */

export const verifyToken = (token: string): JwtPayload | null => {
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  if (!privateKey) {
    console.error('ACCESS_TOKEN_PRIVATE_KEY 환경 변수가 설정되지 않았습니다.');
    return null;
  }

  return jwt.verify(token, privateKey) as JwtPayload;
};

/**
 * 토큰 검증 결과 타입
 */
export interface TokenValidationResult {
  userId: string | null;
  isExpired: boolean;
  hasToken: boolean;
}

/**
 * token을 통해 로그인한 사용자 ID 찾기
 */
export const getLoginUserId = (): string | null => {
  const result = validateToken();
  return result.userId;
};

/**
 * 토큰 검증 및 상세 정보 반환
 */
export const validateToken = (): TokenValidationResult => {
  const token = cookies().get('access_token')?.value;
  if (!token) {
    return { userId: null, isExpired: false, hasToken: false };
  }
  
  try {
    const decoded = verifyToken(token);
    return { userId: decoded?.userId || null, isExpired: false, hasToken: true };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { userId: null, isExpired: true, hasToken: true };
    }
    console.error('JWT 검증 실패:', error);
    return { userId: null, isExpired: false, hasToken: true };
  }
};

/**
 * 토큰 검증 후 userId 반환 (에러 발생 시 throw)
 */
export const getValidatedUserId = (): string => {
  const tokenResult = validateToken();
  
  if (!tokenResult.hasToken) {
    throw new HttpError('UNAUTHORIZED', 401, '로그인이 필요합니다.');
  }
  
  if (tokenResult.isExpired) {
    throw new HttpError('TOKEN_EXPIRED', 401, '토큰이 만료되었습니다. 다시 로그인해주세요.');
  }
  
  if (!tokenResult.userId) {
    throw new HttpError('INVALID_TOKEN', 401, '유효하지 않은 토큰입니다.');
  }
  
  return tokenResult.userId;
};

/**
 * user token 생성
 */
export const generateUserToken = (userId: string): string => {
  const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error(
      'ACCESS_TOKEN_PRIVATE_KEY 환경 변수가 설정되지 않았습니다.',
    );
  }

  return jwt.sign({ userId }, privateKey, {
    expiresIn: '30m',
  });
};
