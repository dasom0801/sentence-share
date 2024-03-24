import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUserStore } from '@/store/user';

import { logoutWithGoogle } from '../api';

const mutationFn = async () => await logoutWithGoogle();

const useLogout = () => {
  const setUser = useUserStore.use.setUser();
  const setIsLogin = useUserStore.use.setIsLogin();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn,
    onSuccess: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      setUser(null);
      setIsLogin(false);
      toast.success('로그아웃 했습니다.');
    },
  });
};

export default useLogout;
