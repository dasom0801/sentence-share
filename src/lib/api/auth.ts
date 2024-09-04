import toast from 'react-hot-toast';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import axios from './api';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      return (
        await axios.post<{ user: User; token: string }>(
          '/api/auth/google',
          {
            uid: result.user.uid,
            provider: result.providerId,
            name: result.user.displayName,
            email: result.user.email,
            profileUrl: result.user.photoURL,
          },
          { withCredentials: true },
        )
      ).data;
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
  } catch (error: unknown) {
    toast.error('로그아웃에 실패했습니다.');
  }
};
