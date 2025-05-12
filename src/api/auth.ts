import { auth } from '@/lib/firebase';

import { signOut } from 'firebase/auth';
import { fetchAPI } from './fetcher';

export const logoutWithGoogle = async () => {
  try {
    // 클라이언트 Firebase 로그아웃
    await signOut(auth);
    // 서버 토큰 삭제 API
    await fetchAPI('/auth/logout', { method: 'POST' });
  } catch (error: unknown) {
    console.log('logout with google error:', error);
    // 호출하는 곳에서 toast 보여주도록 함
    throw error;
  }
};
