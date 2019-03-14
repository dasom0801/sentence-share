import React from 'react';
import BookResultItem from './BookResultItem';
const AddBookSearch = ({ inputBookSearch, keyword, searchBookInfo, bookList, selectBook, showBookInfoInput, checkInputAlert, showInputAlert}) => {
  
  const handleInputChange = (value) =>{
    inputBookSearch(value);
  }

  const handleInputSearch = (event) => {
    event.preventDefault();
    // 만약에 검색어가 공백이라면
    if (keyword.trim()) {
      checkInputAlert(false);
      searchBookInfo({keyword, page: 1}); // 인풋에서 검색API를 call할 때는 page 1 
    } else {
      checkInputAlert(true);
    }
  }

  const printAlert = showInputAlert ? (<p className="alert">검색어를 입력해주세요.</p>) : '';
  const selfInputButton = (
    <button type="button" onClick={() => { showBookInfoInput()}}>직접 입력</button>
  );

  // 검색하기 전에는 아무것도 출력하지 않고, 검색한 후 결과가 없는 경우와 있는 경우를 구분하여 출력
   let bookReusltList = '';
    if (Array.isArray(bookList)) {
      if(bookList.length > 0) {
        bookReusltList = (
          <div className="book-search-result">
            <ul className="book-search-result">
              {bookList.map(book => (<BookResultItem key={book.isbn} book={book} selectBook={selectBook} />))}
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
      <form onSubmit={(event) => { handleInputSearch(event)}}>
        <input type="text" pacleholder="책 이름은 입력하세요" value={keyword} onChange={(event) => { handleInputChange(event.currentTarget.value)}}/>
        <button type="submit">검색</button>
        {printAlert}
      </form>
      {bookReusltList}
    </div>
   );
}
 
export default AddBookSearch;