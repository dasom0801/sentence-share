import React from 'react';
import BookResultItem from './BookResultItem';

const AddBookSearch = ({ inputBookSearch, keyword, searchBookInfo, bookList, selectBook, showBookInfoInput, checkInputAlert, showInputAlert, bookSearchPage, pageableCount}) => {
  
  const handleInputChange = (value) =>{
    inputBookSearch(value);
  }

  const handleInputSearch = (event) => {
    event.preventDefault();
    // 검색어가 공백이 아니라면 알림을 숨기고 API Call
    if (keyword.trim()) {
      checkInputAlert(false);
      searchBookInfo({ keyword, bookSearchPage: 1});
    } else {
      // 만약에 검색어가 공백이라면 알림 표시 
      checkInputAlert(true);
    }
  }

  // 인풋이 공백일 때 표시되는 알림
  const printAlert = showInputAlert ? (<p className="alert">검색어를 입력해주세요.</p>) : '';
  // 원하는 검색 결과가 없을 때 사용자가 직접 입력하는 버튼
  const selfInputButton = (
    <button type="button" className="self-input" onClick={() => { showBookInfoInput()}}>직접 입력</button>
  );

  // 책 검색 결과 페이지네이션 만들기
  const count = Math.floor(pageableCount / 10);
  const bookResultPagination = count
    && Array(count).fill().map((item, index) => <li key={index} className={bookSearchPage === index + 1 ? 'active': ''} onClick={() => { searchBookInfo({ keyword, bookSearchPage: index + 1 })}}>{index+1}</li>)
  
  // 검색하기 전에는 아무것도 출력하지 않고, 검색한 후 결과가 없는 경우와 있는 경우를 구분하여 출력
   let bookReusltList = '';
    if (Array.isArray(bookList)) {
      if(bookList.length > 0) {
        bookReusltList = (
          <div className="book-search-result">
            <ul className="book-list">
              {bookList.map(book => (<BookResultItem key={book.isbn} book={book} selectBook={selectBook} />))}
            </ul>
            <ul className="page">
              {bookResultPagination !== 0 && bookResultPagination}
            </ul>
            <p>찾으시는 결과가 없나요?</p>
            {selfInputButton}
          </div> 
        );
      } else {
        bookReusltList = (<div className="no-result">
          <p>검색 결과가 없습니다.</p>
          {selfInputButton}
        </div>
        );
      }
    } 

  return ( 
    <div className="book-search">
      <p className="page-title">책 검색 </p>
      <form onSubmit={(event) => { handleInputSearch(event)}}>
        <input type="text" pacleholder="책 이름을 입력하세요" value={keyword} onChange={(event) => { handleInputChange(event.currentTarget.value)}}/>
        <button type="submit">검색</button>
        {printAlert}
      </form>
      {bookReusltList}
    </div>
   );
}
 
export default AddBookSearch;