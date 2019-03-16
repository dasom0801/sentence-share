import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import * as actions from '../store/actions/index';

import BookDetail from '../components/Detail/BookDetail';
import UserDetail from '../components/Detail/UserDetail';

class DetailContainer extends Component {
  componentDidMount() {
    const filter = this.props.match.path.indexOf('/book') > -1 ? 'book' : 'user';
    this.props.getDetailListFromDB({
      filter,
      id: this.props.match.params.id,
      orderBy: 'updateDate',
      userId: this.props.userId,
    });
  }
  render () {
    return (
      <div>
        {this.props.match.path.indexOf('/book') > -1 ? <BookDetail {...this.props} /> : <UserDetail {...this.props} />}
      </div>
    );
  }
}
 



const mapStateToProps = ({ user, detail}) => {
  return {
    userId: user.get('id'),
    list: detail.get('list'),
    userList: detail.get('userList'),
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
    likeUp: (index, id, likes, userId, orderBy) => { dispatch(actions.showMoreSentenceBody(index, id, likes, userId, orderBy)) },
    setSelectedUserInfo: (user) => { dispatch(actions.setSelectedUserInfo(user)) }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailContainer));