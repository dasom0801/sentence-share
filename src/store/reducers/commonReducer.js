
import { Map } from 'immutable';
import * as actions from '../actions/actionTypes';

// common 
const commonInitialState = Map({
  showPopup: false,
  popupMsg: '',
  target: ''
});

export const common = (state = commonInitialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_POPUP:
      return state.merge({ showPopup: !state.get('showPopup'), popupMsg: action.msg });
    default:
      return state;
  }
}
