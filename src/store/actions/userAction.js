import * as types from './actionTypes';
import { auth, provider, firestore } from '../../modules/firebaseConfig';
import firebase from 'firebase/app';
import { getDetailListFromDB } from './detailAction';
import { setSentenceList, clearListItem, getList } from './listAction';
import { changeLoadingStatus } from './commonAction';

//firebase로 로그인 하기
export const loginWithFirebase = () => dispatch =>{
  // firebase를 통해서  google 계정으로 로그인
  auth.signInWithPopup(provider).then(result => {
    const { isNewUser } = result.additionalUserInfo;
    const token = result.credential.idToken;
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
      setNewUser(id => dispatch(setUserId(id)));
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
      } else {
        dispatch(changeLoadingStatus(false));
      }
    } else {
      dispatch(changeLoadingStatus(false));
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

// 사용자 탈퇴
export const userDelete = (userId) => dispatch => {
  const user = auth.currentUser
  const idToken = JSON.parse(window.localStorage.getItem('user')).token;
  // delete 하기 위해서는 재인증이 필요하다. 
  const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
  user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
      // state와 localStorage에서 삭제
    dispatch(changeLoginStatus(false));
    dispatch(setUserInfo({ name: '', email: '', picture: '' }));
    dispatch(setUserId(''));
    dispatch(deleteUserLikesData(userId));
    window.localStorage.removeItem('user');
    // auth 회원 삭제 
    user.delete().then(() => {
      // firestore.collection('users').doc(userId).delete() is not working... why...
      firestore.collection('users').doc(userId).get().then(snapshot => {
        snapshot.ref.delete();
      });
      firestore.collection('sentences').where('userInfo.id', '==', `/users/${userId}`).get().then(snapshot => {
        snapshot.docs.forEach(doc => doc.ref.delete());
      })
    })
  });
}

// 탈퇴한 사용자가 좋아요한 데이터 삭제 
export const deleteUserLikesData = (userId) =>() => {
  const sentenceRef = firestore.collection('sentences');
  sentenceRef.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const likeUser = data.likeUser, userIndex = likeUser.indexOf(userId);
      if (userIndex > -1) {
        const updateLikeUserData = likeUser.filter(user => user !== userId);
        const likes = --data.likes;
        doc.ref.update({ likeUser: updateLikeUserData, likes: likes});
      }
    });
  });
}

// firestore User id set
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

// 변경된 이름을 DB에 저장
export const setChangedName = ({userId, nameInput}) => dispatch => {
  firestore.collection('users').doc(userId).set({ name: nameInput }, { merge: true });
  firestore.collection('sentences').where('userInfo.id', '==', `/users/${userId}`).get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      const userInfo = doc.data().userInfo;
      userInfo.name = nameInput;
      doc.ref.update({userInfo: userInfo})
    })
  });
  // 너무 빨리 실행되어 스피너가 표시되지 않기때문에 타이밍을 조절함
  // 스피너가 표시되지 않으면 실행되었다고 사용자가 인식하기 어렵기때문
  setTimeout(() => {
    dispatch(changeLoadingStatus(false));
  }, 500);
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
    if (userLikes.length > 0) {
      dispatch(setSentenceList({ list: userLikes, orderBy: orderBy, userList: [] }));
    }
    dispatch(changeLoadingStatus(false));
  })
}

// 사용자가 작성한 문장 출력
export const getUserSentenceListDB = ({userId, orderBy}) => dispatch => {
  dispatch(clearListItem());
  firestore.collection('sentences').where('userInfo.id', '==', `/users/${userId}`).get().then(snapshot => {
    if (snapshot.docs.length > 0) {
      dispatch(getList({ docs: snapshot.docs, orderBy, userList: [] }));
    } 
    dispatch(changeLoadingStatus(false));
  })
}
