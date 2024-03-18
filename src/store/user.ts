import { create } from 'zustand';

type UserState = {
  isLogin: boolean;
  user: User | null;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  isLogin: !!localStorage.getItem('access_token'),
  user: null,
  setIsLogin: (isLogin: boolean) => set((state) => ({ ...state, isLogin })),
  setUser: (user) => set((state) => ({ ...state, user })),
}));
