import React from 'react';
// import ListSort from '../List/ListSort';
import ListItem from '../List/ListItem';
// import AddButton from '../Add/AddButton';

const UserLikes = ({ list, showMoreSentenceBody, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo, isModifyOpen, togglePopup, showPopup, popupMsg, toggleModifyButton, match, deleteListItem, selectSearchedBook, changeSentenceTextarea}) => {

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
    />
  ));
  return ( 
    <div className="user-likes">
      <p>내가 좋아한 문장</p>
      <p>{list.size? list.size : 0}건</p>
      {/* <ListSort /> */}
      {printList}
      {/* <AddButton /> */}
    </div>
   );
}
 
export default UserLikes;