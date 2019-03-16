import { Map, List } from 'immutable';
import * as actions from '../actions/actionTypes';

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