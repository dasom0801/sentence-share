import { fetchAPI } from '@/api/fetcher';
import { auth } from '@/lib/firebase';
import type { User } from '@/types';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const loginWithGoogle = async () => {
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

export default loginWithGoogle;
