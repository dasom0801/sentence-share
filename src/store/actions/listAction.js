import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';


// 리스트==================================

// DB에서 리스트 가져오기
export const getSentenceListFromDB = (orderBy, startItem) => dispatch => {
  const sentenceRef = firestore.collection("sentences");
  // 리스트에 넣을 데이터 정리
  const getList = (snapshot) => {
    const { docs } = snapshot;
    const list = docs.map(doc => {
      const { body } = doc.data();
      // 본문 길이 체크
      const bodyLengthCheck = body.length > 200
        ? { printBody: body.slice(0, 200) + '...', showMoreButton: true }
        : { printBody: body, showMoreButton: false };
      return Object.assign({}, { id: doc.id }, doc.data(), { time: doc.data().updateDate.toDate() }, bodyLengthCheck, { showMore: false });
    });
    const lastItem = docs[docs.length - 1].id;
    dispatch(setSentenceList(list, lastItem, orderBy));
  }
  // 처음으로 List를 가져올 때 
  if (!startItem) {
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

// 좋아요 수 올리기
export const likeUp = (index, id, likes, userId, orderBy) => dispatch => {
  const sentenceRef = firestore.collection('sentences').doc(id),
    userRef = firestore.collection('users').doc(userId);

  // 해당 문장의 user정보를 비교하여 좋아요를 추가해야하는지 취소해야하는지 판단
  sentenceRef.get().then(snapshot => {
    const data = snapshot.data();
    const likeUser = data.likeUser,
      userIndex = likeUser.indexOf(userId);
    // 사용자가 좋아요를 누르지 않은 문장 
    // sentences에 사용자를 추가하고, users에는 문장을 추가한다
    // state의 likes값 증가
    if (userIndex < 0) {
      const updateUserData = {
        body: data.body,
        bookImage: data.bookImage,
        bookTitle: data.bookTitle,
        sentenceId: firestore.doc('/sentences/' + id),
        updateDate: data.updateDate
      },
        updateSentenceData = [...likeUser, userId];
      likes++;
      sentenceRef.update({ likeUser: updateSentenceData, likes: likes })
      userRef.get().then(snapshot => {
        userRef.update({ userLikes: [...snapshot.data().userLikes, updateUserData] });
        dispatch(changeListItem(index, 'likes', likes));
        dispatch(changeListItem(index, 'likeUser', updateSentenceData));
      })
    } else {
      // 사용자가 이미 좋아요를 누른 문장은 좋아요 취소
      const updateSentenceData = likeUser.filter(user => user !== userId)
      likes--;
      sentenceRef.update({ likeUser: updateSentenceData, likes: likes });
      userRef.get().then(snapshot => {
        const updateUserData = snapshot.data().userLikes.filter(like => like.sentenceId.id !== id);
        userRef.update({ userLikes: updateUserData });
        dispatch(changeListItem(index, 'likes', likes));
        dispatch(changeListItem(index, 'likeUser', updateSentenceData));

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
