import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';
import { getList, clearListItem } from './listAction';
import { changeLoadingStatus } from './commonAction';


export const getDetailListFromDB = (payload) => dispatch => {
  const { filter, id, orderBy, userId, startItem } = payload;
  const queryString = filter === 'book' ? { where: 'bookId', value: `/books/${id}` } : { where: 'userInfo.id', value: `/users/${id}` };
  const sentenceRefs = firestore.collection('sentences');

  // bookDetail인 경우 책 정보를 상단에 표시하기위해 DB에서 값을 가져와야한다. 
  filter === 'book' && firestore.collection('books').doc(id).get().then(snapshot => {
    dispatch(setSelectedBookInfo(snapshot.data()));
  }) 
  // 리스트 첫 페이지 가져오기
  if(!startItem) {
    dispatch(clearListItem());
    sentenceRefs.where(queryString.where, '==', queryString.value).orderBy(orderBy, "desc").limit(5).get().then(snapshot => {
      // 쿼리 결과가 있을 때만 리스트를 출력한다
      if (snapshot.docs.length > 0) {
        dispatch(getList({ docs: snapshot.docs, orderBy, userId }));
      } else {
        // 출력할 리스트가 없다면 스피너를 숨긴다.
        dispatch(changeLoadingStatus(false));
      }
    });
  } else {
    // 추가로 데이터 가져오기
    sentenceRefs.doc(startItem).get().then(snapshot => {
      sentenceRefs.where(queryString.where, '==', queryString.value).orderBy(orderBy, "desc").startAfter(snapshot).limit(5).get().then(snapshot => {
        // 쿼리 결과가 있을 때만 리스트를 출력한다
        if (snapshot.docs.length > 0) {
          dispatch(getList({ docs: snapshot.docs, orderBy, userId }));
        } else {
          // 추가로 출력할 리스트가 없다면 스피너를 숨긴다.
          dispatch(changeLoadingStatus(false));
        }
      });
    })
  }

}

export const changeDetailTab = (tab) => {
  return {
    type: types.CHANGE_DETAIL_TAB,
    tab
  }
}

export const setSelectedBookInfo = (book) => {
  return {
    type: types.SET_SELECTED_BOOK_INFO,
    book
  }
}

export const getSelectedUserInfoDB = (userId) => (dispatch) => {
  firestore.collection('users').doc(userId).get().then(snapshot => {
    dispatch(setSelectedUserInfo(snapshot.data()));
  })
}

export const setSelectedUserInfo = (user) => {
  return {
    type: types.SET_SELECTED_USER_INFO,
    user
  }
}