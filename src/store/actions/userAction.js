import * as types from './actionTypes';
import { auth, provider, firestore } from '../../modules/firebaseConfig';
import { getDetailListFromDB } from './detailAction';
import { setSentenceList, clearListItem } from './listAction';


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
export const getFirebaseUserData = ({ email, getListDB, page}) => dispatch => {
  firestore.collection('users').where("email", "==", email).get().then(querySnapshot => {
    const { email, name, picture } = querySnapshot.docs[0].data();
    const { id } = querySnapshot.docs[0];
    dispatch(setUserInfo({ email, name, picture }));
    dispatch(setUserId(id));
    // 사용자가 새로고침하거나 URL로 바로 접속하여 유저정보가 없는 경우
    // 유저정보를 먼저 저장한 다음에 DB에서 리스트를 받아온다.
    if(page) {
      getListDB.userId = id;
      if(page === 'detail') {
        dispatch(getDetailListFromDB(getListDB));
      } else if (page === 'likes') {
        dispatch(getUserLikesListDB(getListDB))
      } else if (page === 'sentence') {
        dispatch(getUserSentenceListDB(getListDB))
      }
    }
  });
}

// 사용자 로그인 상태 확인
export const changeLoginStatus = (login) => {
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

// 사용자가 좋아요를 누른 문장 출력
export const getUserLikesListDB = ({userId, orderBy}) => dispatch => {
  dispatch(clearListItem());
  firestore.collection('users').doc(userId).get().then(snapshot => {
    const userLikes = snapshot.data().userLikes;
    userLikes.map(item => { 
      item.time = item.updateDate.toDate(); 
      return item;
    });
        
    dispatch(setSentenceList({list: userLikes, orderBy: orderBy, userList: []}));
  });
}

// 사용자가 작성한 문장 출력
export const getUserSentenceListDB = ({userId, orderBy}) => dispatch => {
  dispatch(clearListItem());
  firestore.collection('sentences').where('userInfo.id', '==', `/users/${userId}`).get().then(snapshot => {
    const list = snapshot.docs.map(doc => {
      const item = doc.data();
      item.id = doc.id;
      item.time = item.updateDate.toDate();
      return item;
    });
    dispatch(setSentenceList({ list, orderBy, userList: [] }));
  })
}