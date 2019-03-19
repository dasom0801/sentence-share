import React from 'react';
import ListItem from '../List/ListItem';
import ListSort from '../List/ListSort';

const BookDetail = ({ userId, activeTab, changeDetailTab, list, userList, selectedBook, showMoreSentenceBody, likeCountUp, getDetailListFromDB, history, setSelectedUserInfo, toggleModifyButton, isModifyOpen, togglePopup, showPopup, popupMsg, match, deleteListItem, toggleSort, isSortOpen, orderBy, changeSentenceTextarea, selectSearchedBook}) => {

  const { bookTitle, bookImage, author, publisher} = selectedBook;
  const listPrint = activeTab === 'all' 
    ? list.map((item, index) => ( 
      <ListItem 
        match={match}
        history={history}
        key={item.id}
        item={item}
        index={index}
        showMoreSentenceBody={showMoreSentenceBody}
        likeCountUp={likeCountUp}
        userId={userId}
        getDetailListFromDB={getDetailListFromDB}
        setSelectedUserInfo={setSelectedUserInfo}
        toggleModifyButton={toggleModifyButton}
        isModifyOpen={isModifyOpen}
        togglePopup={togglePopup}
        showPopup={showPopup}
        popupMsg={popupMsg} 
        deleteListItem={deleteListItem}
        selectSearchedBook={selectSearchedBook}
        changeSentenceTextarea={changeSentenceTextarea}
      /> )
    ) : userList.map((item, index) => (
      <ListItem 
        match={match}
        history={history}
        key={item.id}
        item={item}
        index={index}
        showMoreSentenceBody={showMoreSentenceBody}
        likeCountUp={likeCountUp}
        userId={userId}
        getDetailListFromDB={getDetailListFromDB}
        setSelectedUserInfo={setSelectedUserInfo}
        toggleModifyButton={toggleModifyButton}
        isModifyOpen={isModifyOpen}
        togglePopup={togglePopup}
        showPopup={showPopup}
        popupMsg={popupMsg} 
        deleteListItem={deleteListItem}
        selectSearchedBook={selectSearchedBook}
        changeSentenceTextarea={changeSentenceTextarea}/>));

    // 정렬할 때 DB를 불러오기 위한 값
    const getListDB = {
        filter: 'book',
        id: match.params.id,
        orderBy: orderBy,
        startItem: false,
        userId
    }
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
            if(userList.size) {
              changeDetailTab('user');
            }
          }}
          >내문장({userList ? userList.size : 0})</button>
      </div>
      <ListSort
        toggleSort={toggleSort}
        isSortOpen={isSortOpen}
        orderBy={orderBy}
        getDetailListFromDB={getDetailListFromDB}
        getListDB={getListDB}
      />
      <ul className="result-list">
        {listPrint}
      </ul>
    </div>
   );
}
 
export default BookDetail;
