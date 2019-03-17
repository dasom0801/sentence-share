import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';
import { getList, clearListItem } from './listAction';


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
      dispatch(getList({ docs: snapshot.docs, filter, userId }));
    });
  } else {
    // more 버튼 누를 때 
    sentenceRefs.doc(startItem).get().then(snapshot => {
      sentenceRefs.where(queryString.where, '==', queryString.value).orderBy(orderBy, "desc").startAfter(snapshot).limit(5).get().then(snapshot => {
      dispatch(getList({ docs: snapshot.docs, filter, userId }));
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