import { removeToken } from '@/actions/token';
import { auth } from '@/lib/firebase';

import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

export const logoutWithGoogle = async () => {
  try {
    await signOut(auth);
    // TODO: 서버에서 호출하도록 수정
    await removeToken();
  } catch (error: unknown) {
    toast.error('로그아웃에 실패했습니다.');
  }
};
