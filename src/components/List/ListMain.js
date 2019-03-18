import React from 'react';
import ListItem from './ListItem';
import ListSort from './ListSort';
import AddButton from '../Add/AddButton';

const MainList = ({ getSentenceListFromDB, lastItem, list, showMoreSentenceBody, toggleSort, isSortOpen, orderBy, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo, toggleModifyButton, isModifyOpen, togglePopup, showPopup, popupMsg, match, deleteListItem, selectSearchedBook, changeSentenceTextarea}) => {
  const handleMoreClick = () => {
    getSentenceListFromDB(orderBy, lastItem);
  }
  const printList = list && list.map((item, index) => 
    <ListItem 
      match={match}
      history={history}
      key={item.id}
      item={item} 
      index={index} 
      showMoreSentenceBody={showMoreSentenceBody} 
      likeCountUp={likeCountUp} 
      userId={userId} 
      orderBy={orderBy} 
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
  );
  return ( 
    <div className="main-list">
      <p>MainList</p>
      <ListSort 
        toggleSort={toggleSort} 
        isSortOpen={isSortOpen} 
        orderBy={orderBy} 
        getSentenceListFromDB={getSentenceListFromDB} 
      />
      <ul className="senetence-list">
        {printList}
      </ul>
      <button onClick={() => { handleMoreClick()}} type="button">More</button>
      <AddButton />
    </div>
   );
}
 
export default MainList;