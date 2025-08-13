'use client';

import { useUserStore } from '@/store/user';
import { User } from '@/types';
import { useEffect } from 'react';

// Zustand 초기화용 컴포넌트
type UserProviderProps = {
  user: User | null;
};
export default function UserProvider({ user }: UserProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const setIsLogin = useUserStore((state) => state.setIsLogin);

  useEffect(() => {
    if (user) {
      setUser(user);
      setIsLogin(true);
    } else {
      setUser(null);
      setIsLogin(false);
    }
  }, [user]);

  return null;
}
