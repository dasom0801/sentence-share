import React from 'react';
import ListItem from '../List/ListItem';

const BookDetail = ({ userId, activeTab, changeDetailTab, list, userList, selectedBook, showMoreSentenceBody, likeCountUp, getDetailListFromDB, history, setSelectedUserInfo}) => {
  const {bookTitle, bookImage, author, publisher} = selectedBook;
  const listPrint = activeTab === 'all' 
    ? list.map((item, index) => 
     ( <ListItem 
        key={item.id} 
        item={item}
        index={index}
        likeCountUp={likeCountUp}
        showMoreSentenceBody={showMoreSentenceBody}
        userId={userId}
        getDetailListFromDB={getDetailListFromDB}
        history={history}
        setSelectedUserInfo={setSelectedUserInfo}
      /> )
    ) : userList.map((item, index) => (<ListItem
      key={item.id}
      item={item}
      index={index}
      likeCountUp={likeCountUp}
      showMoreSentenceBody={showMoreSentenceBody}
      userId={userId}
      getDetailListFromDB={getDetailListFromDB}
      history={history}
      setSelectedUserInfo={setSelectedUserInfo}
    />) ); 
  return ( 
    <div className="book-detail">
      <div className="book-info">
        <img src={bookImage} alt="책표지"/>
        <p>{bookTitle}</p>
        <p>{author}</p>
        <p>{publisher}</p>
      </div>
      <div className="result-tab">
        <button 
          type="button" 
          className={`all ${activeTab === 'all' ? 'active' : ''}`} 
          onClick={() => { changeDetailTab('all')}}>전체문장({list ? list.size : 0})</button>
        <button 
          type="button" 
          className={`user ${activeTab === 'user'? 'active' : ''}`}
          onClick={() => { 
            if(userList.length) {
              changeDetailTab('user');
            }
          }}
          >내문장({userList ? userList.size : 0})</button>
      </div>
      <ul className="result-list">
        {listPrint}
      </ul>
    </div>
   );
}
 
export default BookDetail;