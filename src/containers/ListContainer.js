import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import ListMain from '../components/List/ListMain';

class ListContainer extends Component {
  componentDidMount() {
    this.props.getSentenceListFromDB('updateDate');
  }
  render() { 
    return ( 
      <ListMain {...this.props} />
     );
  }
}
 

const mapStateToProps = ({ list, user, common}) => {
  return {
   isSortOpen: common.get('isSortOpen'),
   userId: user.get('id'),
   list: list.get('list'),
   lastItem: list.get('lastItem'),
   orderBy: list.get('orderBy')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSort: () => {dispatch(actions.toggleSort())},
    getSentenceListFromDB: (orderBy, startItem) => {dispatch(actions.getSentenceListFromDB(orderBy, startItem))},
    getDetailListFromDB: (payload) => { dispatch(actions.getDetailListFromDB(payload))},
    showMoreSentenceBody: (index) => { dispatch(actions.showMoreSentenceBody(index))},
    likeCountUp: (index, id, likes, userId) => { dispatch(actions.likeCountUp(index,id,likes, userId))},
    setSelectedUserInfo: (user) => { dispatch(actions.setSelectedUserInfo(user))},
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);