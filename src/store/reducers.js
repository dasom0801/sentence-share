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
    default:
      return state;
  }
}