import * as types from './actionTypes';
import { firestore } from '../../modules/firebaseConfig';
import axios from 'axios';
import uuid from 'uuid/v1';
import { changeLoadingStatus } from './commonAction';

const bookImageDefaultUrl = ' https://firebasestorage.googleapis.com/v0/b/sentence-share.appspot.com/o/sample_image-min%20(1).jpg?alt=media&token=9b22fef4-f7e1-40d3-b88b-c69ffaf41638'

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
export const searchBookInfo = (keyword, page) => dispatch => {
  axios.get(`https://dapi.kakao.com/v3/search/book?target=title&query="${keyword}"&page=${page}`, { headers: { Authorization: 'KakaoAK 75545d6d5e327c2f363ab16539f81c7b' } }).then(result => dispatch(setBookSearchResult(result, page)));
}

// 검색된 책 정보로 state 업데이트
export const setBookSearchResult = (result, page) => {
  const { meta, documents } = result.data;
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
export const changeBookInfoInput = ({ value, key }) => {
  return {
    type: types.CHANGE_BOOKINFO_INPUT,
    value,
    key
  }
}
// 사용자 입력 책정보 등록
// 만약에 모든 정보가 입력되지 않으면 등록하지 않고 알림문구를 보여준다.
export const submitBookInfoInput = ({ infoVisible, book, selected }) => {
  // 사용자가 정보를 전부 입력했다면 image와 uuid를 추가한다. 
  if (selected) {
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
export const submitSentence = ({ user, selectedBook, sentenceTextValue }) => dispatch => {
  firestore.collection('books').where('isbn', '==', selectedBook.isbn).get().then(snapshot => {
    const senetenceObj = {
      body: sentenceTextValue,
      bookId: '',
      bookImage: selectedBook.bookImage,
      bookTitle: selectedBook.bookTitle,
      publisher: selectedBook.publisher,
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
    if (snapshot.empty) {
      firestore.collection('books').add(selectedBook).then(snapshot => {
        senetenceObj.bookId = `/books/${snapshot.id}`
        firestore.collection('sentences').add(senetenceObj);
      })
    } else {
      // 같은 책이 이미 등록되어있는 경우 문장만 등록
      senetenceObj.bookId = `/books/${snapshot.docs[0].id}`
      firestore.collection('sentences').add(senetenceObj);
    }
    dispatch(changeLoadingStatus(false));
  })
}

export const setModifyStatus = () => {
  return {
    type: types.SET_MODIFY_STATUS,

  }
}

// 문장 수정
export const modifySentence = ({ sentenceId, sentenceTextValue}) => dispatch => {
  firestore.collection('sentences').doc(sentenceId).update({body: sentenceTextValue});
  setTimeout(() => {
    dispatch(changeLoadingStatus(false));
  }, 500);
}

// Component did mount 시점에 수정할 Item의 data를 가져온다. 
export const getModifyItemDB = (sentenceId) => dispatch => {
  firestore.collection('sentences').doc(sentenceId).get().then(snapshot => {
    const data = snapshot.data();
    const {author, bookImage, bookTitle, publisher, isbn} = data;
    const selectedItemBookInfo = {
      author: [author],
      bookImage,
      bookTitle,
      publisher,
      isbn
    }
    dispatch(changeSentenceTextarea(data.body));
    dispatch(selectSearchedBook(selectedItemBookInfo));
  });
} 