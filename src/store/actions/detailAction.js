import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';
import { getList, clearListItem } from './listAction';
import { changeLoadingStatus } from './commonAction';


export const getDetailListFromDB = (payload) => dispatch => {
  // user는 사용자 상세에서 사용되는 값 (해당 사용자가 등록한 글 모아보기 위한 것)
  // userId는 로그인한 사용자의 key값
  const { filter, orderBy, user, bookId, userId } = payload;
  const queryString = filter === 'book' ? { where: 'bookId', value: `/books/${bookId}` } : { where: 'userInfo.id', value: user.id };
  const sentenceRefs = firestore.collection('sentences');
  
  // bookDetail인 경우 책 정보를 상단에 표시하기위해 DB에서 값을 가져와야한다. 
  filter === 'book' && firestore.collection('books').doc(bookId).get().then(snapshot => {
    dispatch(setSelectedBookInfo(snapshot.data()));
  }) 
  // 리스트 가져오기
  dispatch(clearListItem());
    sentenceRefs.where(queryString.where, '==', queryString.value).orderBy(orderBy, "desc").get().then(snapshot => {
      // 쿼리 결과가 있을 때만 리스트를 출력한다 
      // userId는 전체 문장과 접속한 사용자가 등록한 문장을 구분하기 위해서 필요.
      if (snapshot.docs.length > 0) {
        dispatch(getList({ docs: snapshot.docs, orderBy, userId }));
      } else {
        // 출력할 리스트가 없다면 스피너를 숨긴다.
        dispatch(changeLoadingStatus(false));
    }
  });
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