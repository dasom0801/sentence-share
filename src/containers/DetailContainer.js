import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../store/actions/index';

import BookDetail from '../components/Detail/BookDetail';
import UserDetail from '../components/Detail/UserDetail';
import '../styles/components/ListItem.scss';
import '../styles/components/Detail.scss';


class DetailContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // componentDidMount 시점에 데이터가 없다면 가져오기
    // 사용자 상세 정보를 가져와야하는지 책 상세정보를 가져와야하는지 확인하기 위한 값
    const filter = this.props.match.path.indexOf('/book') > -1 ? 'book' : 'user';
    // 쿼리에 사용할 책Id
    const bookId = filter === 'book' && this.props.match.params.id;
    if (!this.props.userId) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      this.props.changeLoadingStatus(true);
      // 로그인 한 사용자 정보를 가져온 뒤 List를 가져올 수 있도록 필요한 정보를 전달한다.
      this.props.getFirebaseUserData({
        email: user.email,
        getListDB: {
          filter,
          orderBy: 'updateDate',
          startItem: false,
          bookId,
          user: {
            id: `/users/${this.props.match.params.id}`
          } 
        },
        page: 'detail'
      })
    }
    // 사용자 상세 페이지라면 선택된 사용자의 정보를 가져온다.
    filter === 'user' && this.props.getSelectedUserInfoDB(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.changeDetailTab('all');
  }
  render () {
    return (
      <div>
        {this.props.match.path.indexOf('/book') > -1 ? <BookDetail {...this.props} /> : <UserDetail {...this.props} />}
      </div>
    );
  }
}

const mapStateToProps = ({ user, detail, list, common}) => {
  return {
    userId: user.get('id'),
    list: list.get('list'),
    userList: list.get('userList'),
    isModifyOpen: list.get('isModifyOpen'),
    selectedModifyItem: list.get('selectedModifyItem'),
    orderBy: list.get('orderBy'),
    activeTab: detail.get('activeTab'),
    selectedBook: detail.get('selectedBook'),
    selectedUser: detail.get('selectedUser'),
    isSortOpen: common.get('isSortOpen'),
    showPopup: common.get('showPopup'),
    popupMsg: common.get('popupMsg'),
  }
};
 
const mapDispatchToProps = dispatch => {
  return {
    getDetailListFromDB: (payload) => { dispatch(actions.getDetailListFromDB(payload)) },
    changeDetailTab: (tab) => { dispatch(actions.changeDetailTab(tab))},
    showMoreSentenceBody: (index) => { dispatch(actions.showMoreSentenceBody(index))},
    likeCountUp: (index, id, likes, userId, orderBy) => { dispatch(actions.likeCountUp(index, id, likes, userId, orderBy)) },
    getSelectedUserInfoDB: (user) => { dispatch(actions.getSelectedUserInfoDB(user)) },
    setSelectedUserInfo: (user) => { dispatch(actions.setSelectedUserInfo(user)) },
    getFirebaseUserData: (payload) => { dispatch(actions.getFirebaseUserData (payload)) },
    toggleModifyButton: (bool, id) => { dispatch(actions.toggleModifyButton(bool, id)) },
    togglePopup: (msg) => { dispatch(actions.togglePopup(msg)) },
    deleteListItem: (payload) => { dispatch(actions.deleteListItem(payload)) },
    selectSearchedBook: (book) => { dispatch(actions.selectSearchedBook(book)) },
    changeSentenceTextarea: (value) => { dispatch(actions.changeSentenceTextarea(value)) },
    changeLoadingStatus: (bool) => { dispatch(actions.changeLoadingStatus(bool)) },
    toggleSort: () => { dispatch(actions.toggleSort()) },
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailContainer));
