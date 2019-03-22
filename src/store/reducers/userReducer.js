import { Map } from 'immutable';
import * as actions from '../actions/actionTypes';


// user
const userInitailState = Map({
  loginStatus: false,
  id: '',
  email: '',
  name: '',
  nameInput: '',
  picture: ''
})

export const user = (state = userInitailState, action) => {
  switch (action.type) {
    case actions.CHANGE_LOGIN_STATUS:
      return state.set('loginStatus', action.login);
    case actions.SET_USER_INFO:
      const { email, name, picture, id } = action.user;
      return state.merge({ 'id': id, 'email': email, 'name': name, 'picture': picture, 'nameInput': name });
    case actions.SET_USER_ID:
      return state.set('id', action.id);
    case actions.CHANGE_NAME_INPUT:
      return state.set('nameInput', action.input);
    case actions.CHANGE_NAME:
      return state.merge({ 'name': action.name, 'nameInput': action.name });
    case actions.CHANGE_USER_PICTURE: 
      return state.set('picture', action.url);
    default:
      return state;
  }
}