import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import { FirebaseError } from 'firebase/app';
import axios from './api';

// TODO: 로그인/로그아웃 한 다음에 toast 메시지 보여주기
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      await axios.post('/api/auth/google', {
        uid: result.user.uid,
        provider: result.providerId,
        name: result.user.displayName,
        email: result.user.email,
        profileUrl: result.user.photoURL,
      });
    } else {
      console.log('로그인 실패');
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof FirebaseError) {
      // Handle Errors here.
      const errorCode = error?.code;
      const errorMessage = error.message;
    } else {
    }
  }
};

export const signOutWithGoogle = () => {
  try {
    signOut(auth);
  } catch (error) {}
};
