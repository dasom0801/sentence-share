
import { Map } from 'immutable';
import * as actions from '../actions/actionTypes';

// common 
const commonInitialState = Map({
  isSortOpen: false,
  showPopup: false,
  popupMsg: '',
  target: '',
  isLoading: false
});

export const common = (state = commonInitialState, action) => {
  switch (action.type) {
    case actions.TOGGLE_SORT: 
      return state.set('isSortOpen', !state.get('isSortOpen'));
    case actions.TOGGLE_POPUP:
      return state.merge({ showPopup: !state.get('showPopup'), popupMsg: action.msg });
    case actions.CHANGE_LOADGIN_STATUS:
      return state.set('isLoading', action.bool);
    default:
      return state;
  }
}
