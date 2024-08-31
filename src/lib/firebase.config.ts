import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'sentence-share.firebaseapp.com',
  databaseURL: 'https://sentence-share.firebaseio.com',
  projectId: 'sentence-share',
  storageBucket: 'sentence-share.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
