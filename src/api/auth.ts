import { removeToken } from '@/actions/token';
import { auth } from '@/lib/firebase';
import { User } from '@/types';

import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

import { fetchAPI } from './fetcher';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const idToken = await result.user.getIdToken();
      return await fetchAPI<User>('/auth/google', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
    } else {
      throw new Error('로그인/회원가입에 실패했습니다.');
    }
  } catch (error: unknown) {
    console.log(error);
    throw new Error('로그인/회원가입에 실패했습니다.');
  }
};

export const logoutWithGoogle = async () => {
  try {
    await signOut(auth);
    // TODO: 서버에서 호출하도록 수정
    await removeToken();
  } catch (error: unknown) {
    toast.error('로그아웃에 실패했습니다.');
  }
};
