import * as types from './actionTypes';
import { firestore } from '../modules/firebaseConfig';
import axios from 'axios';
import uuid from 'uuid/v1';

const bookImageDefaultUrl =' https://firebasestorage.googleapis.com/v0/b/sentence-share.appspot.com/o/sample_image-min%20(1).jpg?alt=media&token=9b22fef4-f7e1-40d3-b88b-c69ffaf41638'

// ======= common
export const togglePopup = (msg) => {
  return {
    type: types.TOGGLE_POPUP,
    msg
  }
}

// DB에서 가져온 리스트를 출력형식에 맞게 정리
export const getList = ({docs, target, filter, userId}) => dispatch =>{
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
        sentenceRef.update({likeUser: updateSentenceData, likes: likes})
        userRef.get().then(snapshot => {
          userRef.update({ userLikes: [...snapshot.data().userLikes, updateUserData] });
          dispatch(changeListItem(index, 'likes', likes));
          dispatch(changeListItem(index, 'likeUser', updateSentenceData));
        })
      } else {
        // 사용자가 이미 좋아요를 누른 문장은 좋아요 취소
        const updateSentenceData = likeUser.filter(user => user !== userId)
        likes--;
        sentenceRef.update({ likeUser: updateSentenceData , likes: likes});
        userRef.get().then(snapshot => {
          const updateUserData = snapshot.data().userLikes.filter(like => like.sentenceId.id !== id);
          userRef.update({ userLikes: updateUserData});
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


// ================ Book
export const resetBookState = () => {
  return {
    type: types.RESET_BOOK_STATE
  }
}

export const checkInputAlert = (bool) => {
  return {
    type: types.SHOW_INPUT_ALERT,
    bool
  }
}

export const inputBookSearch = (input) => {
  return {
    type: types.INPUT_BOOK_SEARCH,
    input
  }
}

// 책 정보 검색
export const searchBookInfo = (keyword,page) => dispatch => {
     axios.get(`https://dapi.kakao.com/v3/search/book?target=title&query="${keyword}"&page=${page}`, { headers: { Authorization: 'KakaoAK 75545d6d5e327c2f363ab16539f81c7b'}}).then(result =>dispatch(setBookSearchResult(result,page)));
}

// 검색된 책 정보로 state 업데이트
export const setBookSearchResult = (result,page) => {
  const {meta, documents} = result.data;
  const list = documents.map(doc => {
    // 이미지가 없는 경우 기본 이미지로 대체함
    const image = doc.thumbnail ? doc.thumbnail : bookImageDefaultUrl;
    const isbn = doc.isbn ? doc.isbn : uuid();
    return {
      author: doc.authors,
      bookImage: image,
      bookTitle: doc.title,
      publisher: doc.publisher,
      isbn: isbn
    }
  })
  return {
    type: types.SET_BOOK_SEARCH_RESULT,
    list,
    page,
    pageable: meta.pageable_count
  }
}

// 검색 결과에서 책 선택
export const selectSearchedBook = (book) => {
  return {
    type: types.SELECT_SEARCHED_BOOK,
    book
  }
}

// 책정보 입력창 보여주기
export const showBookInfoInput = () => {
  return {
    type: types.SHOW_BOOKINFO_INPUT
  }
}

// 사용자 입력 책정보 인풋 핸들링
export const changeBookInfoInput = ({value, key}) => {
  return {
    type: types.CHANGE_BOOKINFO_INPUT,
    value,
    key
  }
}
// 사용자 입력 책정보 등록
// 만약에 모든 정보가 입력되지 않으면 등록하지 않고 알림문구를 보여준다.
export const submitBookInfoInput = ({ infoVisible, book, selected}) => {
  // 사용자가 정보를 전부 입력했다면 image와 uuid를 추가한다. 
  if(selected) {  
    book.bookImage = bookImageDefaultUrl;
    book.isbn = uuid();
  }
  return {
    type: types.SUBMIT_BOOKINFO_INPUT,
    infoVisible,
    selected,
    book,
  }
}

// 문장 textarea 
export const changeSentenceTextarea = (value) => {
  return {
    type: types.CHANGE_SENTENCE_TEXTAREA,
    value
  }
}

// 문장등록
export const submitSentence = ({user, selectedBook, sentenceTextValue}) => dispatch => {
  firestore.collection('books').where('isbn','==',selectedBook.isbn).get().then(snapshot => {
    const senetenceObj = {
      body: sentenceTextValue,
      bookId: '',
      bookImage: selectedBook.bookImage,
      bookTitle: selectedBook.bookTitle,
      likeUser: [],
      likes: 0,
      updateDate: new Date(),
      userInfo: {
        id: `/users/${user.userId}`,
        name: user.userName,
        picture: user.userPicture
     }
  }
    // 책이 등록되지 않은 경우 새로 추가
    if(snapshot.empty) {
      firestore.collection('books').add(selectedBook).then(snapshot => {
        senetenceObj.bookId = `/books/${snapshot.id}`
        firestore.collection('sentences').add(senetenceObj);
      })
    } else {
      // 같은 책이 이미 등록되어있는 경우 문장만 등록
      senetenceObj.bookId= `/books/${snapshot.docs[0].id}`
      firestore.collection('sentences').add(senetenceObj);
    }
  })
}


// ================ detail
export const getDetailListFromDB = (payload) => dispatch=> {
  const { filter, id, orderBy, userId} = payload;
  const queryString = filter === 'book' ? { where: 'bookId', value: `/books/${id}` } : { where: 'userInfo.id', value: `/users/${id}`};
  const seneteceRefs = firestore.collection('sentences');
  seneteceRefs.where(queryString.where, '==', queryString.value).orderBy(orderBy, "desc").get().then(snapshot => {
    dispatch(getList({docs: snapshot.docs, target: 'detail', filter, userId}));
  });
  filter === 'book' && firestore.collection('books').doc(id).get().then(snapshot => {
    dispatch(setSelectedBookInfo(snapshot.data()));
  })
}

// 가공한 list를 받아서 state로 
export const setDetailList = (list, userList) => {
  return {
    type: types.SET_DETAIL_LIST,
    list, 
    userList
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
export const setSelectedUserInfo = (user) => {
  console.log('check', user)
  return {
    type: types.SET_SELECTED_USER_INFO,
    user
  }
}