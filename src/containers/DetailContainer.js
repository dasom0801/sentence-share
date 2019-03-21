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
    console.log(this.props.selectedBook);
    
    window.scrollTo(0, 0);
    // componentDidMount 시점에 데이터가 없다면 가져오기
    const filter = this.props.match.path.indexOf('/book') > -1 ? 'book' : 'user';
    const bookId = filter === 'book' && this.props.match.params.id;
    if (!this.props.userId) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      this.props.changeLoadingStatus(true);
      this.props.getFirebaseUserData({
        email: user.email,
        getListDB: {
          filter,
          id: this.props.match.params.id,
          orderBy: 'updateDate',
          startItem: false,
          bookId
        },
        page: 'detail'
      })
    }
    this.props.getSelectedUserInfoDB(this.props.match.params.id);
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
