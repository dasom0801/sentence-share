import React from 'react';
import ListItem from '../List/ListItem';
import ListSort from '../List/ListSort';

const UserDetail = ({ list, userId, selectedUser, showMoreSentenceBody, likeCountUp, getDetailListFromDB, history, setSelectedUserInfo, toggleModifyButton, isModifyOpen, togglePopup, showPopup, popupMsg, match, deleteListItem, selectSearchedBook, changeSentenceTextarea, toggleSort, isSortOpen, orderBy }) => {
  const getListDB = {
    filter: 'user',
    id: match.params.id,
    orderBy: orderBy,
    startItem: false,
    userId
  }
  return (
    <div className="user-detail">
      <div className="user-info">
        <img src={selectedUser.picture} alt="" />
        {selectedUser.name}
      </div>
      <p>등록문장({list.size? list.size : 0})</p>
      <ListSort
        toggleSort={toggleSort}
        isSortOpen={isSortOpen}
        orderBy={orderBy}
        getDetailListFromDB={getDetailListFromDB}
        getListDB={getListDB}
      />
      <ul className="result-list">
        {list.map((item, index) =>
          (<ListItem
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
          />)) }
      </ul>
    </div>
  );
}

export default UserDetail;