import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { signOut } from '@firebase/auth';
import toast from 'react-hot-toast';

import { deleteUser } from '@/lib/api';
import { auth } from '@/lib/firebase.config';

const mutationFn = async () => {
  return await deleteUser();
};

const useDeleteUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['DeleteUser'],
    mutationFn,
    onSuccess: async () => {
      await signOut(auth);
      toast.success('탈퇴했습니다.');
      navigate('/');
    },
  });
};

export default useDeleteUser;
