import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateUser } from '@/lib/api';
import { useUserStore } from '@/store/user';

export const MUTATION_KEY = ['[PUT]/api/user/me'];

const mutationFn = async (userInfo: Record<string, any>) =>
  (await updateUser(userInfo)).data;

export const useUpdateProfile = () => {
  const setUser = useUserStore.use.setUser();
  return useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: (userInfo: Record<string, any>) => mutationFn(userInfo),
    onSuccess: (user: User) => {
      setUser(user);
      toast.success('업데이트했습니다.');
    },
  });
};
