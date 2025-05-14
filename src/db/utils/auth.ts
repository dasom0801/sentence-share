import { User } from '@/types/user';
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
 * token을 통해 로그인한 사용자 ID 찾기
 */

export const getLoginUserId = (): string | null => {
  const token = cookies().get('access_token')?.value;
  if (!token) {
    return null;
  }
  try {
    const decoded = verifyToken(token);
    return decoded?.userId;
  } catch (error) {
    // 토큰 만료 에러는 무시
    if (!(error instanceof TokenExpiredError)) {
      console.error('JWT 검증 실패:', error);
    }
    return null;
  }
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
