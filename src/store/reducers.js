import { Map } from 'immutable'; 
import * as actions from './actionTypes';


const initailState = Map({
  login: false,
  id: '',
  email: '',
  name: '',
  nameInput: '',
  picture: ''
})

export const user = (state=initailState, action) => {
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