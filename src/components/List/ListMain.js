import React from 'react';
import ListItem from './ListItem';
import ListSort from './ListSort';
import AddButton from '../Add/AddButton';

import '../../styles/components/List.scss';

const MainList = ({ getSentenceListFromDB, list, showMoreSentenceBody, toggleSort, isSortOpen, orderBy, handleLikeClick, userId, getDetailListFromDB, history, setSelectedUserInfo, toggleModifyButton, isModifyOpen, togglePopup, showPopup, popupMsg, match, deleteListItem, selectSearchedBook, changeSentenceTextarea, selectedModifyItem}) => {
  const printList = list && list.map((item, index) => 
    <ListItem 
      match={match}
      history={history}
      key={item.id}
      item={item} 
      index={index} 
      showMoreSentenceBody={showMoreSentenceBody} 
      handleLikeClick={handleLikeClick} 
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
      selectedModifyItem={selectedModifyItem}
    />
  );
  return ( 
    <div className="main-list">
      <AddButton />
      <ListSort 
        toggleSort={toggleSort} 
        isSortOpen={isSortOpen} 
        orderBy={orderBy} 
        getSentenceListFromDB={getSentenceListFromDB} 
      />
      <ul className="sentence-list">
        {printList}
      </ul>
    </div>
   );
}
 
export default MainList;