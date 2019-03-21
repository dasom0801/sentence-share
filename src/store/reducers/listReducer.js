import { Map, List } from 'immutable';
import * as actions from '../actions/actionTypes';

// list
const listInitialState = Map({
  list: List([]),
  userList: List([]),
  lastItem: '',
  orderBy: 'updateDate',
  isModifyOpen: false,
  selectedModifyItem: '',
})

export const list = (state = listInitialState, action) => {
  switch (action.type) {
    case actions.SET_SENTENCE_LIST:
      return state.update('list', arr => arr.push(...action.list)).set('lastItem', action.lastItem).set('orderBy', action.orderBy).update('userList', arr=> arr.push(...action.userList));
    case actions.SHOW_MORE_SENTENCE_BODY:
      return state.setIn(['list', action.index, 'showMore'], !state.getIn(['list', action.index, 'showMore']))
        .setIn(['list', action.index, 'showMoreButton'], !state.getIn(['list', action.index, 'showMoreButton']));
    case actions.CLEAR_LIST_ITEM:
      return state.merge({list: List([]), userList: List([])});
    case actions.CHAHNGE_LIST_ITEM:
      return state.setIn(['list', action.index, action.key], action.value);
    case actions.TOGGLE_MODIFY_BUTTON: 
      return state.merge({ isModifyOpen: action.bool, selectedModifyItem: action.id});
    default:
      return state;
  }
}