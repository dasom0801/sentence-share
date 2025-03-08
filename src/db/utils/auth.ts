import { User } from '@/types/user';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import models from '../models';

/**
 * token을 통해 인증된 사용자를 찾기
 *
 */
export const getAuthenticatedUser = async (): Promise<User | null> => {
  const token = cookies().get('access_token')?.value;
  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded?.userId) {
      return null;
    }
    return await models.User.findById(decoded.userId).lean<User>();
  } catch (error) {
    console.error('JWT 검증 실패:', error);
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
