import type { User } from '@/types';
import { create } from 'zustand';
import { createSelectors } from './util';

export type UserState = {
  isLogin: boolean;
  user: User | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User | null) => void;
};

const useUserStoreBase = create<UserState>((set) => ({
  isLogin:
    typeof window === 'undefined'
      ? false
      : !!localStorage.getItem('access_token'),
  user: null,
  setIsLogin: (isLogin: boolean) => set((state) => ({ ...state, isLogin })),
  setUser: (user) => set((state) => ({ ...state, user })),
}));

export const useUserStore = createSelectors(useUserStoreBase);
