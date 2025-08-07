'use client';

import { cleanupExpiredToken } from '@/api/auth';
import { useUserStore } from '@/store/user';
import { User } from '@/types';
import { useEffect } from 'react';

// Zustand 초기화용 컴포넌트
type UserProviderProps = {
  user: User | null;
  isTokenExpired: boolean;
};
export default function UserProvider({
  user,
  isTokenExpired,
}: UserProviderProps) {
  const setUser = useUserStore.use.setUser();
  const setIsLogin = useUserStore.use.setIsLogin();

  useEffect(() => {
    const setLoggedInUser = (user: User) => {
      setUser(user);
      setIsLogin(true);
    };

    const setLoggedOutUser = () => {
      setUser(null);
      setIsLogin(false);
    };

    const initializeUser = async () => {
      if (user) {
        // 서버에서 사용자 정보 로드 성공
        setLoggedInUser(user);
      } else {
        // 로그아웃 상태로 설정
        setLoggedOutUser();

        // 토큰 만료 시 추가 클린업 처리
        if (isTokenExpired) {
          await cleanupExpiredToken();
        }
      }
    };

    initializeUser();
  }, [user, isTokenExpired, setUser, setIsLogin]);

  return null;
}
