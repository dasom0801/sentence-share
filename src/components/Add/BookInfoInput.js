import React from 'react';

const BookInfoInput = ({ changeBookInfoInput, bookInputValue, submitBookInfoInput, showInputAlert, checkInputAlert}) => {
  const { title, author, publisher } = bookInputValue.toJS();
  let emptyValue = [];
  let printAlert = '';

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if ((!title || !title.trim()) || (!author || !author.trim()) || (!publisher || !publisher.trim())) {
      // 입력이 덜 되었을 때는 alert만 보일 수 있도록 상태변경
      checkInputAlert(true);
    } else {
      checkInputAlert(false);
      submitBookInfoInput({ 
        infoVisible: false, 
        book: {
          author: [author],
          bookTitle: title,
          publisher: publisher
        },
        selected: true
      });
    }
  }
  !title ? emptyValue.push('제목') : (!title.trim() && emptyValue.push('제목'));
  !author ? emptyValue.push('저자') : (!author.trim() && emptyValue.push('저자'));
  !publisher ? emptyValue.push('출판사') : (!publisher.trim() && emptyValue.push('출판사'));
  printAlert = emptyValue.length && showInputAlert ? (<p className="alert">{emptyValue.join(',')}를 입력해주세요.</p>) : '';
  
  return ( 
    <form className="book-info-input" onSubmit={(event) => {handleInputSubmit(event)}}>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" value={bookInputValue.title} 
        onChange={(event) => { changeBookInfoInput({key: 'title', value: event.currentTarget.value})}}
      />
      <label htmlFor="author">저자</label>
      <input type="text" id="author" value={bookInputValue.author} 
        onChange={(event) => { changeBookInfoInput({ key: 'author', value: event.currentTarget.value })}}
      />
      <label htmlFor="publisher">출판사</label>
      <input type="text" id="publisher" value={bookInputValue.publisher}
        onChange={(event) => changeBookInfoInput({ key: 'publisher', value: event.currentTarget.value })}
      />
      <button type="submit">완료</button>
      {printAlert}
    </form>
   );
}
 
export default BookInfoInput;