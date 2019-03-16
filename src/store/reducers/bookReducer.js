import { Map, List } from 'immutable';
import * as actions from '../actions/actionTypes';


//---------- book

const bookInitialState = Map({
  searchKeyword: '',
  page: 0,
  pageableCount: 0,
  isBookSelected: false, // 사용자가 검색 결과에서 책을 선택했는지 여부 확인
  isBookInfoVisible: false, // 책 정보 입력창을 보여주기 위한 값
  showInputAlert: false, // 인풋창 전부 입려하지 않고 등록을 눌렀을 경우 알림문구를 보여줌
  bookInputValue: Map({
  }),
  bookList: List([]), // 검색 결과 리스트
  selectedBook: Map({}), // 검색 결과에서 선택한 책
  sentenceTextValue: ''
});

export const book = (state = bookInitialState, action) => {
  switch (action.type) {
    case actions.RESET_BOOK_STATE:
      return state.merge(bookInitialState);
    case actions.SHOW_INPUT_ALERT:
      return state.set('showInputAlert', action.bool);
    case actions.INPUT_BOOK_SEARCH:
      return state.set('searchKeyword', action.input);
    case actions.SET_BOOK_SEARCH_RESULT:
      return state.merge({ 'bookList': action.list, 'page': action.page, 'pageableCount': action.pageable });
    case actions.SELECT_SEARCHED_BOOK:
      return state.merge({ 'selectedBook': action.book, 'isBookSelected': true });
    case actions.SHOW_BOOKINFO_INPUT:
      return state.set('isBookInfoVisible', true);
    case actions.CHANGE_BOOKINFO_INPUT:
      return state.setIn(['bookInputValue', action.key], action.value);
    case actions.SUBMIT_BOOKINFO_INPUT:
      return state.merge({
        'isBookInfoVisible': action.infoVisible, 'selectedBook': action.book, 'isBookSelected': action.selected
      });
    case actions.CHANGE_SENTENCE_TEXTAREA:
      return state.set('sentenceTextValue', action.value);
    default:
      return state;
  }
}
