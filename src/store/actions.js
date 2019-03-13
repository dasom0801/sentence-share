import * as types from './actionTypes';
import { firestore } from '../modules/firebaseConfig';

// =================== 사용자 

// 사용자 로그인 상태 확인
export const changeLoginStatus = (login) =>{ 
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

// =======================================


// 리스트==================================

// DB에서 리스트 가져오기
export const getSentenceListFromDB = (orderBy, startItem) => dispatch =>{
  const sentenceRef = firestore.collection("sentences");
  // 리스트에 넣을 데이터 정리
  const getList = (snapshot) => {
    const {docs} = snapshot;
    const list = docs.map(doc => {
      const {body} = doc.data();
      // 본문 길이 체크
      const bodyLengthCheck = body.length > 200 
        ? { printBody: body.slice(0, 200) + '...', showMoreButton: true} 
        : { printBody: body, showMoreButton: false};
      return Object.assign({}, { id: doc.id }, doc.data(), { time: doc.data().updateDate.toDate() }, bodyLengthCheck, {showMore: false} );
    });
    const lastItem = docs[docs.length - 1].id;
    dispatch(setSentenceList(list, lastItem, orderBy));
  }
  // 처음으로 List를 가져올 때 
  if(!startItem) {
    dispatch(clearListItem());
    sentenceRef.orderBy(orderBy, "desc").limit(5).get().then(snapshot => {
      getList(snapshot);
    });
  } else {
    // more버튼을 누를 때
    sentenceRef.doc(startItem).get().then(snapshot => {
      sentenceRef.orderBy(orderBy, "desc").startAfter(snapshot).limit(5).get().then(snapshot => {
        getList(snapshot);
      });
    })
  }
}

export const setSentenceList = (list, lastItem, orderBy) => ({
  type: types.SET_SENTENCE_LIST,
  list,
  lastItem,
  orderBy
})

// 문장 더보기
export const showMoreSentenceBody = (index) => {
  return {
    type: types.SHOW_MORE_SENTENCE_BODY,
    index
  }
}

// 리스트 비우기 > 최신순,인기순 정렬시 이전 List에 추가되어버리기 떄문에
export const clearListItem = () => {
  return {
    type: types.CLEAR_LIST_ITEM
  }
}