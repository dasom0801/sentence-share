import { logoutWithGoogle } from '@/api/auth';
import { useUserStore } from '@/store/user';
import { useMutation } from '@tanstack/react-query';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const mutationFn = async () => await logoutWithGoogle();

const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setUser = useUserStore.use.setUser();
  const setIsLogin = useUserStore.use.setIsLogin();

  const redirectAfterLogout = () => {
    // 인증이 필요한 페이지 목록
    const protectedRoutes = ['edit', 'my'];

    const isHome = pathname === '/';
    const isProtected = protectedRoutes.includes(pathname.split('/')[1]);

    // 현재 경로가 루트('/')인 경우
    if (isHome) {
      // 기존 쿼리 파라미터를 유지한 채 router.push 실행
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/?${params.toString()}`);
      return;
    }

    // 로그아웃 상태에서는 접근할 수 없으므로 메인 페이지로 리디렉션
    if (isProtected) {
      router.push('/');
      return;
    }

    // 그 외의 경로에서는 이동하지 않음
  };

  return useMutation({
    mutationKey: ['logout'],
    mutationFn,
    onSuccess: () => {
      setUser(null);
      setIsLogin(false);
      redirectAfterLogout();
      toast.success('로그아웃 했습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useLogout;
