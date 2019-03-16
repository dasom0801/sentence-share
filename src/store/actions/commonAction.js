import * as types from './actionTypes';

// ======= common
export const togglePopup = (msg) => {
  return {
    type: types.TOGGLE_POPUP,
    msg
  }
}

// DB에서 가져온 리스트를 출력형식에 맞게 정리
export const getList = ({ docs, target, filter, userId }) => dispatch => {
  const list = docs.map(doc => {
    const { body } = doc.data();
    // 본문 길이 체크
    const bodyLengthCheck = body.length > 200
      ? { printBody: body.slice(0, 200) + '...', showMoreButton: true }
      : { printBody: body, showMoreButton: false };
    return Object.assign({}, { id: doc.id }, doc.data(), { time: doc.data().updateDate.toDate() }, bodyLengthCheck, { showMore: false });
  });
  if (target === 'detail') {
    if (filter === 'book') {
      const userList = list.filter(item => item.userInfo.id.indexOf(userId) > -1);
      dispatch(setDetailList(list, userList));
    } else {
      const userList = [];
      dispatch(setDetailList(list, userList));
    }

    // 이건 처음 List state에 적용하는 거 (수정하기) target list 이렇게...
    //dispatch(setSentenceList(list, lastItem, orderBy));
  }
}


// 가공한 list를 받아서 state로 
export const setDetailList = (list, userList) => {
  return {
    type: types.SET_DETAIL_LIST,
    list,
    userList
  }
}