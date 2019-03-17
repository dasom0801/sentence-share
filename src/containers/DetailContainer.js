import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../store/actions/index';

import BookDetail from '../components/Detail/BookDetail';
import UserDetail from '../components/Detail/UserDetail';

class DetailContainer extends Component {
  componentDidMount() {
    const filter = this.props.match.path.indexOf('/book') > -1 ? 'book' : 'user';
    if (!this.props.userId) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      this.props.getFirebaseUserData({
        email: user.email,
        getListDB: {
          filter,
          id: this.props.match.params.id,
          orderBy: 'updateDate'
        },
        page: 'detail'
      })
    }
    this.props.getSelectedUserInfoDB(this.props.match.params.id);
  }
  render () {
    return (
      <div>
        {this.props.match.path.indexOf('/book') > -1 ? <BookDetail {...this.props} /> : <UserDetail {...this.props} />}
      </div>
    );
  }
}
 



const mapStateToProps = ({ user, detail, list}) => {
  return {
    userId: user.get('id'),
    list: list.get('list'),
    userList: list.get('userList'),
    activeTab: detail.get('activeTab'),
    selectedBook: detail.get('selectedBook'),
    selectedUser: detail.get('selectedUser')
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
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailContainer));