import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import { loginWithGoogle } from '../api';

const mutationFn = async () => await loginWithGoogle();

const useLogin = (afterLogin?: string) => {
  const { setUser, setIsLogin } = useUserStore.getState();
  const router = useRouter();

  return useMutation({
    mutationKey: ['/api/auth/google'],
    mutationFn,
    onSuccess: ({ data }) => {
      setIsLogin(true);
      setUser(data);
      toast.success('로그인했습니다.');
      if (afterLogin) {
        router.push(afterLogin);
      }
    },
    onError: () => {
      toast.error('로그인/회원가입에 실패했습니다.');
    },
  });
};

export default useLogin;
