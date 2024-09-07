import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/user';

import { logoutWithGoogle } from '../api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const mutationFn = async () => await logoutWithGoogle();

const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setUser = useUserStore.use.setUser();
  const setIsLogin = useUserStore.use.setIsLogin();

  function goToMain() {
    const authRoutes = ['edit', 'my'];
    if (pathname === '/') {
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/?${params.toString()}`);
      return;
    }

    if (authRoutes.includes(pathname.split('/')[1])) {
      router.push('/');
      return;
    }
  }

  return useMutation({
    mutationKey: ['logout'],
    mutationFn,
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      setUser(null);
      setIsLogin(false);
      goToMain();
      toast.success('로그아웃 했습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogout;
