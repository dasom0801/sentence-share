import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

import AddSentence from '../components/Add/AddSentence';
import BookInfoInput from '../components/Add/BookInfoInput';

class BookContainer extends Component {
  componentDidMount() {
    if (this.props.match.path === '/add') {
      // 데이터가 남아있을지 모르니 삭제
      this.props.resetBookState();
    } else if(this.props.match.path ==='/modify/:id') {
      this.props.getModifyItemDB(this.props.match.params.id);
    }
  }
  render() { 
    const printItem = this.props.isBookInfoVisible 
      ? <BookInfoInput {...this.pops}/> 
    : <AddSentence {...this.props} />;
    return ( 
      <Fragment>
        { printItem}
      </Fragment>
     );
  }
}
const mapStateToProps = ({ book, common, user}) => {
  return {
    showPopup: common.get('showPopup'),
    popupMsg: common.get('popupMsg'),
    isLoading: common.get('isLoading'),
    searchKeyword: book.get('searchKeyword'),
    bookList: book.get('bookList'),
    bookInputValue: book.get('bookInputValue'),
    pageableCount: book.get('pageableCount'),
    bookSearchPage: book.get('bookSearchPage'),
    isBookSelected: book.get('isBookSelected'),
    isBookInfoVisible: book.get('isBookInfoVisible'),
    showInputAlert: book.get('showInputAlert'),
    selectedBook: book.get('selectedBook'),
    sentenceTextValue: book.get('sentenceTextValue'),
    userId: user.get('id'),
    userName: user.get('name'),
    userPicture: user.get('picture')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    togglePopup: (msg) => dispatch(actions.togglePopup(msg)),
    resetBookState: () => dispatch(actions.resetBookState()),
    inputBookSearch: (input) => dispatch(actions.inputBookSearch(input)),
    searchBookInfo: ({keyword, bookSearchPage}) => dispatch(actions.searchBookInfo(keyword, bookSearchPage)),
    selectBook: (book) => dispatch(actions.selectSearchedBook(book)),
    showBookInfoInput: () => dispatch(actions.showBookInfoInput()),
    changeBookInfoInput: (input) => dispatch(actions.changeBookInfoInput(input)),
    submitBookInfoInput: (data) => dispatch(actions.submitBookInfoInput(data)),
    checkInputAlert: (bool) => dispatch(actions.checkInputAlert(bool)),
    changeSentenceTextarea: (value) => dispatch(actions.changeSentenceTextarea(value)),
    submitSentence: (value) => dispatch(actions.submitSentence(value)),
    modifySentence: (sentence) => dispatch(actions.modifySentence(sentence)),
    getModifyItemDB: (sentenceId) => dispatch(actions.getModifyItemDB(sentenceId)),
    changeLoadingStatus: (bool) => { dispatch(actions.changeLoadingStatus(bool)) },
    toggleModifyButton: (bool) => { dispatch(actions.toggleModifyButton(bool)) },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContainer);
