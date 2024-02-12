import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/database';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import 'firebase/messaging';
// import 'firebase/functions';

// Firebase Config
const config = {
  apiKey: 'AIzaSyDYHr1yLjSEDJbFrb4FszqfxFCeR_EfVCE',
  authDomain: 'sentence-share.firebaseapp.com',
  databaseURL: 'https://sentence-share.firebaseio.com',
  projectId: 'sentence-share',
  storageBucket: 'sentence-share.appspot.com',
  messagingSenderId: '1097615792160',
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;
