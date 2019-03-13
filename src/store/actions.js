import * as types from './actionTypes';

// 사용자 로그인 상태 확인
export const changeLoginStatus = (login) =>{ 
  return {
    type: types.CHANGE_LOGIN_STATUS,
    login
  };
}
// 사용자 정보 등록
export const setUserInfo = (user) => {
  return {
    type: types.SET_USER_INFO,
    user
  }
}
// firestore 문서 id
export const setUserId = (id) => {
  return {
    type: types.SET_USER_ID,
    id
  }
}

// 사용자 이름 변경 Input onChange에 연결
export const changeNameInput = (input) => {
  return {
    type: types.CHANGE_NAME_INPUT,
    input
  }
}
// 사용자 이름 변경
export const changeName = (name) => {
  return {
    type: types.CHANGE_NAME,
    name
  }
}