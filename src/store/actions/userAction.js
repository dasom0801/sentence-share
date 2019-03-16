import * as types from './actionTypes';
import { auth, provider, firestore } from '../../modules/firebaseConfig';

//firebase로 로그인 하기
export const loginWithFirebase = () => dispatch =>{
  // firebase를 통해서  google 계정으로 로그인
  auth.signInWithPopup(provider).then(result => {
    const { isNewUser } = result.additionalUserInfo;
    const token = result.credential.accessToken;
    const { email, picture, name } = result.additionalUserInfo.profile;

    if (isNewUser) {
      // 새로운 사용자라면 DB에 정보를 추가한 다음 문서 id를 받아서 state에 저장
      const setNewUser = (fn) => {
        const userInfo = {
          picture,
          name,
          email,
          userLikes: [],
        }
        firestore.collection('users').add(userInfo).then(docRef => fn(docRef.id));
      }
      dispatch(setUserInfo({ email, name, picture }));
      dispatch(setNewUser(id => setUserId(id)));
    } else {
      // 새로운 사용자가 아니라면 email로 query하여 정보를 찾는다.
      firestore.collection('users').where("email", "==", email).get().then(querySnapshot => {
        const { email, name, picture } = querySnapshot.docs[0].data();
        const { id } = querySnapshot.docs[0];
        dispatch(setUserInfo({ email, name, picture }));
        dispatch(setUserId(id));
      });
    }

    //state의 로그인 상태 변경, user 정보 저장
    dispatch(changeLoginStatus(true));

    // 로그인 유지를 위하여 localstorage에 token을 저장한다. 
    window.localStorage.setItem('user', JSON.stringify({ token: token, email: email }));
  });
}

// 사용자가 접속했을 때 localstorage의 값으로 DB에서 user 정보를 가져온다
export const getFirebaseUserData = (email) => dispatch => {
  firestore.collection('users').where("email", "==", email).get().then(querySnapshot => {
    const { email, name, picture } = querySnapshot.docs[0].data();
    const { id } = querySnapshot.docs[0];
    dispatch(setUserInfo({ email, name, picture }));
    dispatch(setUserId(id));
  });
}

// 사용자 로그인 상태 확인
export const changeLoginStatus = (login) => {
  console.log(login);
  
  return {
    type: types.CHANGE_LOGIN_STATUS,
    login
  };
}
// 사용자 정보 등록
export const setUserInfo = (user) => {
  return {
    type: types.SET_USER_INFO,
    user
  }
}
// firestore 문서 id
export const setUserId = (id) => {
  return {
    type: types.SET_USER_ID,
    id
  }
}

// 사용자 이름 변경 Input onChange에 연결
export const changeNameInput = (input) => {
  return {
    type: types.CHANGE_NAME_INPUT,
    input
  }
}
// 사용자 이름 변경
export const changeName = (name) => {
  return {
    type: types.CHANGE_NAME,
    name
  }
}