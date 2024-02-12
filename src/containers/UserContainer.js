import React, { Component, Fragment } from 'react';

import UserInfo from '../components/UserMenu/UserInfo';
import UserSentence from '../components/UserMenu/UserSentence';
import UserLikes from '../components/UserMenu/UserLikes';

class UserContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // componentDidMount 시점에 데이터가 없다면 가져오기
    const { path } = this.props.match,
      { userId, getFirebaseUserData, changeLoadingStatus } = this.props;
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!userId) {
      // 스피너 보여주기
      changeLoadingStatus(true);
      getFirebaseUserData({
        email: user.email,
        getListDB: {
          orderBy: 'updateDate',
          startItem: false,
        },
        page: path.replace('/', ''),
      });
    }
  }
  render() {
    const { path } = this.props.match;
    let printComponent = false;
    switch (path) {
      case '/info':
        printComponent = <UserInfo {...this.props} />;
        break;
      case '/likes':
        printComponent = <UserLikes {...this.props} />;
        break;
      case '/sentence':
        printComponent = <UserSentence {...this.props} />;
        break;
      default:
        break;
    }
    return <Fragment>{printComponent}</Fragment>;
  }
}

// const mapStateToProps = ({ user, list, common }) => {
//   return {
//     userId: user.get('id'),
//     email: user.get('email'),
//     name: user.get('name'),
//     nameInput: user.get('nameInput'),
//     picture: user.get('picture'),
//     list: list.get('list'),
//     isModifyOpen: list.get('isModifyOpen'),
//     selectedModifyItem: list.get('selectedModifyItem'),
//     orderBy: list.get('orderBy'),
//     showPopup: common.get('showPopup'),
//     popupMsg: common.get('popupMsg'),
//     isLoading: common.get('isLoading'),
//     isSortOpen: common.get('isSortOpen'),
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeNameInput: (input) => {
//       dispatch(actions.changeNameInput(input));
//     },
//     changeName: (name) => {
//       dispatch(actions.changeName(name));
//     },
//     changeLoginStatus: (login) => dispatch(actions.changeLoginStatus(login)),
//     setUserInfo: (user) => dispatch(actions.setUserInfo(user)),
//     setUserId: (id) => dispatch(actions.setUserId(id)),
//     getFirebaseUserData: (payload) =>
//       dispatch(actions.getFirebaseUserData(payload)),
//     showMoreSentenceBody: (index) => {
//       dispatch(actions.showMoreSentenceBody(index));
//     },
//     handleLikeClick: (index, id, likes, userId, orderBy) => {
//       dispatch(actions.handleLikeClick(index, id, likes, userId, orderBy));
//     },
//     getDetailListFromDB: (payload) => {
//       dispatch(actions.getDetailListFromDB(payload));
//     },
//     setSelectedUserInfo: (user) => {
//       dispatch(actions.setSelectedUserInfo(user));
//     },
//     userDelete: (userId) => {
//       dispatch(actions.userDelete(userId));
//     },
//     setChangedName: (userInfo) => {
//       dispatch(actions.setChangedName(userInfo));
//     },
//     toggleModifyButton: (bool, id) => {
//       dispatch(actions.toggleModifyButton(bool, id));
//     },
//     togglePopup: (msg) => {
//       dispatch(actions.togglePopup(msg));
//     },
//     deleteListItem: (payload) => {
//       dispatch(actions.deleteListItem(payload));
//     },
//     selectSearchedBook: (book) => {
//       dispatch(actions.selectSearchedBook(book));
//     },
//     changeSentenceTextarea: (value) => {
//       dispatch(actions.changeSentenceTextarea(value));
//     },
//     changeLoadingStatus: (bool) => {
//       dispatch(actions.changeLoadingStatus(bool));
//     },
//     getUserLikesListDB: (payload) => {
//       dispatch(actions.getUserLikesListDB(payload));
//     },
//     getUserSentenceListDB: (payload) => {
//       dispatch(actions.getUserSentenceListDB(payload));
//     },
//     toggleSort: () => {
//       dispatch(actions.toggleSort());
//     },
//     handleImageChange: (image) => {
//       dispatch(actions.handleImageChange(image));
//     },
//   };
// };

export default UserContainer;
