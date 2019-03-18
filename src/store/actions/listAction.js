import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';
import { getDetailListFromDB } from './detailAction';
import { getUserLikesListDB, getUserSentenceListDB } from './userAction';


// 리스트==================================

// DB에서 가져온 리스트를 출력형식에 맞게 정리
export const getList = ({ docs, userId, orderBy }) => dispatch => {
  const list = docs.map(doc => {
    const { body } = doc.data();
    // 본문 길이 체크
    const bodyLengthCheck =body.length > 200
      ? { printBody: body.slice(0, 200) + '...', showMoreButton: true }
      : { printBody: body, showMoreButton: false };
      
    return Object.assign({}, { id: doc.id }, doc.data(), { time: doc.data().updateDate.toDate() }, bodyLengthCheck, { showMore: false });
  });
  const lastItem = list.length &&  list[list.length - 1].id;
  if (userId) {
    const userList = list.filter(item => item.userInfo.id.indexOf(userId) > -1);
    dispatch(setSentenceList({ list, lastItem, userList, orderBy }));
  } else {
    const userList = [];
    dispatch(setSentenceList({ list, lastItem, userList, orderBy }));
  }
}
// DB에서 리스트 가져오기
export const getSentenceListFromDB = (orderBy, startItem) => dispatch => {
  const sentenceRef = firestore.collection("sentences");
  // 처음으로 List를 가져올 때 
  if (!startItem) {
    dispatch(clearListItem());
    sentenceRef.orderBy(orderBy, "desc").limit(5).get().then(snapshot => {
      dispatch(getList({docs: snapshot.docs, orderBy}));
    });
  } else {
    // more버튼을 누를 때
    sentenceRef.doc(startItem).get().then(snapshot => {
      sentenceRef.orderBy(orderBy, "desc").startAfter(snapshot).limit(5).get().then(snapshot => {
        dispatch(getList({ docs: snapshot.docs, orderBy }));
      });
    })
  }
}

export const setSentenceList = ({list, lastItem, orderBy, userList}) => ({
  type: types.SET_SENTENCE_LIST,
  list,
  lastItem,
  orderBy,
  userList
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

// 좋아요 수 올리기
export const likeCountUp = (index, id, likes, userId) => dispatch => {
  const sentenceRef = firestore.collection('sentences').doc(id),
    userRef = firestore.collection('users').doc(userId);
      
  // 해당 문장의 user정보를 비교하여 좋아요를 추가해야하는지 취소해야하는지 판단
  sentenceRef.get().then(snapshot => {
    const data = snapshot.data();
    const likeUser = data.likeUser, userIndex = likeUser.indexOf(userId);

    // 사용자가 좋아요를 누르지 않은 문장은 sentences에 사용자를 추가하고, users에는 문장을 추가한다
    // state의 likes값 증가
    if (userIndex < 0) {
      const bodyLengthCheck = data.body.length > 200
        ? { printBody: data.body.slice(0, 200) + '...', showMoreButton: true }
        : { printBody: data.body, showMoreButton: false };

      
      data.likes = ++likes;
      const updateLikeUserData = [...likeUser, userId];
      const updateUserData = Object.assign({}, { id: id }, data, bodyLengthCheck, { showMore: false }, { likeUser: updateLikeUserData})
      
      sentenceRef.update({ likeUser: updateLikeUserData, likes: likes })
      userRef.get().then(snapshot => {
        userRef.update({ userLikes: [...snapshot.data().userLikes, updateUserData] });
        dispatch(changeListItem(index, 'likes', likes));
        dispatch(changeListItem(index, 'likeUser', updateLikeUserData));
      })
    } else {
      // 사용자가 이미 좋아요를 누른 문장은 좋아요 취소
      const updateLikeUserData = likeUser.filter(user => user !== userId)
      likes--;
      sentenceRef.update({ likeUser: updateLikeUserData, likes: likes });
      userRef.get().then(snapshot => {
        const updateUserData = snapshot.data().userLikes.filter(like => like.id !== id);
        userRef.update({ userLikes: updateUserData });
        dispatch(changeListItem(index, 'likes', likes));
        dispatch(changeListItem(index, 'likeUser', updateLikeUserData));
      })
    }
  });
}
// state의 단일 요소 수정
export const changeListItem = (index, key, value) => {
  return {
    type: types.CHAHNGE_LIST_ITEM,
    index,
    key,
    value
  }
}

// 글 수정, 삭제 버튼 토글
export const toggleModifyButton = () =>{
  return {
    type: types.TOGGLE_MODIFY_BUTTON
  }
}

// 글 삭제
export const deleteListItem = ({sentenceId, path, getListDB}) => dispatch => {
  firestore.collection('sentences').doc(sentenceId).delete();
  console.log(path);
  
  if(path === '/') {
    dispatch(getSentenceListFromDB('updateDate'));
  } else if (path.indexOf('detail') > -1) {
    dispatch(getDetailListFromDB(getListDB));
  } else if (path.indexOf('likes') > -1) {
    dispatch(getUserLikesListDB(getListDB))
  } else if (path.indexOf('sentences') > -1) {
    dispatch(getUserSentenceListDB(getListDB))
  }
}