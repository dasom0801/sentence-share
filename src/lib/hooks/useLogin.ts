import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useUserStore } from '@/store/user';
import { loginWithGoogle } from '../api';

const mutationFn = async () => await loginWithGoogle();

const useLogin = () => {
  const { setUser, setIsLogin } = useUserStore((state) => state);
  return useMutation({
    mutationKey: ['/api/auth/google'],
    mutationFn,
    onSuccess: ({ token, user }) => {
      setIsLogin(true);
      setUser(user);
      localStorage.setItem('access_token', token);
      toast.success('로그인했습니다.');
    },
    onError: () => {
      toast.error('로그인/회원가입에 실패했습니다.');
    },
  });
};

export default useLogin;
