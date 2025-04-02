import { removeToken } from '@/lib/actions';
import { User } from '@/types';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../firebase.config';
import { fetchAPI } from './api';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      return await fetchAPI<{ user: User; token: string }>('/auth/google', {
        method: 'POST',
        body: JSON.stringify({
          uid: result.user.uid,
          provider: result.providerId,
          name: result.user.displayName,
          email: result.user.email,
          profileUrl: result.user.photoURL,
        }),
        credentials: 'include',
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
    await removeToken();
  } catch (error: unknown) {
    toast.error('로그아웃에 실패했습니다.');
  }
};
