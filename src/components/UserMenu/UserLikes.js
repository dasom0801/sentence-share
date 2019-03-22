import React from 'react';
import ListSort from '../List/ListSort';
import ListItem from '../List/ListItem';

const UserLikes = ({ list, showMoreSentenceBody, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo, isModifyOpen, togglePopup, showPopup, popupMsg, toggleModifyButton, match, deleteListItem, selectSearchedBook, changeSentenceTextarea, orderBy, isSortOpen, toggleSort, getUserLikesListDB, selectedModifyItem}) => {

  const printList = list.map((item, index)=> (
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
      selectedModifyItem={selectedModifyItem}
    />
  ));
  // 정렬할 때 DB를 불러오기 위한 값
  const getListDB = {
    filter: 'likes',
    orderBy: orderBy,
    startItem: false,
    userId
  }
  return ( 
    <div className="user-likes">
      <p className="page-title">내가 좋아한 문장</p>
      <p className="count">{list.size? list.size : 0}건</p>
      <ListSort
        toggleSort={toggleSort}
        isSortOpen={isSortOpen}
        orderBy={orderBy}
        getUserLikesListDB={getUserLikesListDB}
        getListDB={getListDB}
      />
      <ul className="sentence-list">
        {list.size ? printList : <p className="no-result"> 좋아한 문장이 없습니다. </p>}
      </ul>
    </div>
   );
}
 
export default UserLikes;