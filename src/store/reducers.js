import { Map, List } from 'immutable'; 
import * as actions from './actionTypes';

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
  bookList: List([]), // 검색 결과 리스트
  selectedBook: Map({}) // 검색 결과에서 선택한 책
});

export const book = (state = bookInitialState, action) => {
  switch (action.type) {
    case actions.INPUT_BOOK_SEARCH:
      return state.set('searchKeyword', action.input);
    case actions.SET_BOOK_SEARCH_RESULT:
      return state.merge({'bookList': action.list, 'page': action.page, 'pageableCount': action.pageable});
    case actions.SELECT_SEARCHED_BOOK:
      return state.merge({'selectedBook': action.book, 'isBookSelected': true})
    default:
      return state;
  }
}