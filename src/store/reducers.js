import { Map, List } from 'immutable'; 
import * as actions from './actionTypes';

// common 
const commonInitialState = Map({
  showPopup: false,
  popupMsg: '',
  target: ''
});

export const common = (state=commonInitialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_POPUP:
      return state.merge({showPopup: !state.get('showPopup'), popupMsg: action.msg});   
    default:
      return state;
  }
}


// user
const userInitailState = Map({
  login: false,
  id: '',
  email: '',
  name: '',
  nameInput: '',
  picture: ''
})

export const user = (state=userInitailState, action) => {
  switch (action.type) {
    case actions.CHANGE_LOGIN_STATUS:
      return state.set('login', action.login);
    case actions.SET_USER_INFO: 
      const {email, name, picture, id} = action.user;
      return state.merge({'id': id, 'email': email, 'name': name, 'picture': picture, 'nameInput': name});
    case actions.SET_USER_ID: 
      return state.set('id', action.id);
    case actions.CHANGE_NAME_INPUT: 
      return state.set('nameInput', action.input);
    case actions.CHANGE_NAME:
      return state.merge({'name': action.name, 'nameInput': action.name});
    default:
      return state;
  }
}

// list
const listInitialState = Map({
  list: List([]),
  lastItem: '',
  orderBy: 'updateDate'
})

export const list = (state = listInitialState, action) => {
  switch (action.type) {
    case actions.SET_SENTENCE_LIST:
      return state.update('list', arr => arr.push(...action.list)).set('lastItem', action.lastItem).set('orderBy', action.orderBy);
    case actions.SHOW_MORE_SENTENCE_BODY:
      return state.setIn(['list', action.index, 'showMore'], !state.getIn(['list', action.index, 'showMore']))
                      .setIn(['list', action.index, 'showMoreButton'], !state.getIn(['list', action.index, 'showMoreButton']));
    case actions.CLEAR_LIST_ITEM: 
      return state.set('list', List());                  
    case actions.CHAHNGE_LIST_ITEM: 
      return state.setIn(['list', action.index, action.key], action.value);
    default:
      return state;
  }
}

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
  sentenceTextValue:'' 
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
      return state.merge({'bookList': action.list, 'page': action.page, 'pageableCount': action.pageable});
    case actions.SELECT_SEARCHED_BOOK:
      return state.merge({'selectedBook': action.book, 'isBookSelected': true});
    case actions.SHOW_BOOKINFO_INPUT:
      return state.set('isBookInfoVisible', true);
    case actions.CHANGE_BOOKINFO_INPUT:
      return state.setIn(['bookInputValue', action.key], action.value);
    case actions.SUBMIT_BOOKINFO_INPUT:
      return state.merge({ 
        'isBookInfoVisible': action.infoVisible, 'selectedBook': action.book, 'isBookSelected' : action.selected
      });
    case actions.CHANGE_SENTENCE_TEXTAREA:
      return state.set('sentenceTextValue', action.value);
    default:
      return state;
  }
}

//========== detail
const detailInitialState =Map({
  list: List([]),
  userList: List([]),
  activeTab: 'all',
  selectedBook: Map({}),
  selectedUser: Map({})
})

export const detail = (state = detailInitialState, action) => {
  switch (action.type) {
    case actions.SET_DETAIL_LIST: 
      return state.merge({list: action.list, userList:action.userList});
    case actions.CHANGE_DETAIL_TAB:
      return state.set('activeTab', action.tab);
    case actions.SET_SELECTED_BOOK_INFO:
      return state.set('selectedBook', action.book);
    case actions.SET_SELECTED_USER_INFO:
      return state.set('selectedUser', action.user);
    default:
      return state
  }
}