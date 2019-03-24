import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import ListMain from '../components/List/ListMain';

class ListContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getSentenceListFromDB('updateDate');
    // 스크롤 이벤트 추가 > 리스트 데이터 불러오기
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    // 스크롤 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { getSentenceListFromDB, changeLoadingStatus, orderBy, lastItem, isLoading} = this.props;
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      changeLoadingStatus(true);
      // 데이터를 불러오는 중에는 데이터 요청을 하지 않는다. 
      if (!isLoading) {
        getSentenceListFromDB(orderBy, lastItem);
      } else {
        return false;
      }
    };
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
    orderBy: list.get('orderBy'),
    selectedModifyItem: list.get('selectedModifyItem'),
    isModifyOpen: list.get('isModifyOpen'),
    showPopup: common.get('showPopup'),
    popupMsg: common.get('popupMsg'),
    isLoading: common.get('isLoading'),
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
    toggleModifyButton: (bool, id) => { dispatch(actions.toggleModifyButton(bool, id))},
    togglePopup: (msg) => { dispatch(actions.togglePopup(msg))},
    deleteListItem: (payload) => { dispatch(actions.deleteListItem(payload))},
    selectSearchedBook: (book) => { dispatch(actions.selectSearchedBook(book))},
    changeSentenceTextarea: (value) => { dispatch(actions.changeSentenceTextarea(value))},
    changeLoadingStatus: (bool) => { dispatch(actions.changeLoadingStatus(bool))},
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListContainer);