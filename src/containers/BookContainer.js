import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

import AddSentence from '../components/Add/AddSentence';

class BookContainer extends Component {
  componentDidMount() {
    window.Kakao.init('75545d6d5e327c2f363ab16539f81c7b');
  }
  render() { 
    const { searchKeyword, inputBookSearch, searchBookInfo, bookList, isBookSelected, selectBook } = this.props;
    return ( 
      <AddSentence 
        searchKeyword={searchKeyword} 
        inputBookSearch={inputBookSearch}
        searchBookInfo={searchBookInfo}
        bookList={bookList}
        isBookSelected={isBookSelected}
        selectBook={selectBook}
      />
     );
  }
}
const mapStateToProps = ({ book }) => {
  return {
    searchKeyword: book.get('searchKeyword'),
    bookList: book.get('bookList'),
    isBookSelected: book.get('isBookSelected')
  }
};

const mapDispatchToProps = dispatch => {
  return {
    inputBookSearch: (input) => dispatch(actions.inputBookSearch(input)),
    searchBookInfo: ({keyword, page}) => dispatch(actions.searchBookInfo(keyword, page)),
    selectBook: (book) => dispatch(actions.selectSearchedBook(book))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookContainer);
