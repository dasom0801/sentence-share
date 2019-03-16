import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';
import { getList } from './commonAction';

// ================ detail
export const getDetailListFromDB = (payload) => dispatch => {
  const { filter, id, orderBy, userId } = payload;
  const queryString = filter === 'book' ? { where: 'bookId', value: `/books/${id}` } : { where: 'userInfo.id', value: `/users/${id}` };
  const seneteceRefs = firestore.collection('sentences');
  seneteceRefs.where(queryString.where, '==', queryString.value).orderBy(orderBy, "desc").get().then(snapshot => {
    dispatch(getList({ docs: snapshot.docs, target: 'detail', filter, userId }));
  });
  filter === 'book' && firestore.collection('books').doc(id).get().then(snapshot => {
    dispatch(setSelectedBookInfo(snapshot.data()));
  })
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
export const setSelectedUserInfo = (user) => {
  console.log('check', user)
  return {
    type: types.SET_SELECTED_USER_INFO,
    user
  }
}