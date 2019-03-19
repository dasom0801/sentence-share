import React from 'react';
import ListSort from '../List/ListSort';
import ListItem from '../List/ListItem';

const UserSentence = ({ list, showMoreSentenceBody, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo, toggleModifyButton, isModifyOpen, togglePopup, showPopup, popupMsg, match, deleteListItem, selectSearchedBook, changeSentenceTextarea, toggleSort, isSortOpen, orderBy, getUserSentenceListDB}) => {
  // 출력할 리스트 아이템 만들기
  const printList = list.map((item, index) => (
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
    />
  ));
  // 정렬할 때 DB를 불러오기 위한 값
  const getListDB = {
    filter: 'sentence',
    orderBy: orderBy,
    startItem: false,
    userId
  }
  return ( 
    <div className="book-detail">
      <p>내가 공유한 문장</p>
      <p>{list.size ? list.size : 0}건</p> 
      <ListSort
        toggleSort={toggleSort}
        isSortOpen={isSortOpen}
        orderBy={orderBy}
        getUserSentenceListDB={getUserSentenceListDB}
        getListDB={getListDB}
      />
      {printList}
    </div>
   );
}
 
export default UserSentence;