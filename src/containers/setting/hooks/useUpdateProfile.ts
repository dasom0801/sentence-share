import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY as useUserQueryKey } from '@/lib/hooks/useUserQuery';
import { updateUser } from '@/lib';
import { toast } from 'react-toastify';
import { getToastConfig } from '../../../utils';

export const MUTATION_KEY = ['[PUT]/api/user/me'];

const mutationFn = async (userInfo: Record<string, any>) =>
  (await updateUser(userInfo)).data;

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: (userInfo: Record<string, any>) => mutationFn(userInfo),
    onSuccess: (user: User) => {
      queryClient.setQueryData(useUserQueryKey, user);
      toast.success('업데이트했습니다.', getToastConfig());
    },
  });
};
