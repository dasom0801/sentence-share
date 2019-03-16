import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import ListMain from '../components/List/ListMain';

class ListContainer extends Component {
 state = {
    showSort: false
  }
  componentDidMount() {
    this.props.getSentenceListFromDB('updateDate');
  }

  toggleSort = () => {
    this.setState({
      showSort: !this.state.showSort
    })
  }

  render() { 
    const { orderBy, getSentenceListFromDB, lastItem, list, showMoreSentenceBody, likeUp, userId, getDetailListFromDB, history, setSelectedUserInfo} = this.props;
    return ( 
      <ListMain 
        showSort={this.state.showSort}
        userId={userId}
        orderBy={orderBy}
        list={list} 
        lastItem={lastItem} 
        toggleSort={this.toggleSort}
        getSentenceListFromDB={getSentenceListFromDB} 
        showMoreSentenceBody={showMoreSentenceBody}
        likeUp={likeUp}
        getDetailListFromDB={getDetailListFromDB}
        history = {history}
        setSelectedUserInfo={setSelectedUserInfo}
      />
     );
  }
}
 

const mapStateToProps = ({ list, user}) => {
  return {
   userId: user.get('id'),
   list: list.get('list'),
   lastItem: list.get('lastItem'),
   orderBy: list.get('orderBy')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getSentenceListFromDB: (orderBy, startItem) => {dispatch(actions.getSentenceListFromDB(orderBy, startItem))},
    getDetailListFromDB: (payload) => { dispatch(actions.getDetailListFromDB(payload)) },
    showMoreSentenceBody: (index) => { dispatch(actions.showMoreSentenceBody(index))},
    likeUp: (index, id, likes, userId) => { dispatch(actions.likeUp(index,id,likes, userId))},
    setSelectedUserInfo: (user) => { dispatch(actions.setSelectedUserInfo(user))},
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);