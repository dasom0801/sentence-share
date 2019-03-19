import * as types from './actionTypes';

export const toggleSort = () => {
  return {
    type: types.TOGGLE_SORT
  }
}

export const togglePopup = (msg) => {
  return {
    type: types.TOGGLE_POPUP,
    msg
  }
}

// 가공한 list를 받아서 state로 
export const setDetailList = (list, userList) => {
  return {
    type: types.SET_DETAIL_LIST,
    list,
    userList
  }
}

// 로딩중 플래그
export const changeLoadingStatus = (bool) => {
  return {
    type: types.CHANGE_LOADGIN_STATUS,
    bool
  }
}