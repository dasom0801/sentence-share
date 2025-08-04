import { updateUser } from '@/api/user';
import { useUserStore } from '@/store/user';
import { ApiResponse, User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useUpdateUserName = () => {
  const { setUser } = useUserStore.getState();

  const mutate = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ data: user }: ApiResponse<User>) => {
      toast.success('사용자 정보가 성공적으로 업데이트되었습니다.');
      setUser(user);
    },
    onError: () => {
      toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    },
  });

  return {
    updateUserName: mutate.mutate,
    isPending: mutate.isPending,
  };
};
