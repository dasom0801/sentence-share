import { useUserStore } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../api';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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

      const target = (() => {
        if (!afterLogin) return '/';
        // 외부/위험 프로토콜 차단
        const isUnsafe =
          /^(https?:)?\/\//i.test(afterLogin) ||
          /^javascript:/i.test(afterLogin);
        if (isUnsafe) return '/';
        // 상대경로 보정
        return afterLogin.startsWith('/') ? afterLogin : `/${afterLogin}`;
      })();
      // 로그인 후 히스토리에 /login이 남지 않도록 replace
      router.replace(target);
    },
    onError: () => {
      toast.error('로그인/회원가입에 실패했습니다.');
    },
  });
};

export default useLogin;
