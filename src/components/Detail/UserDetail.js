import React from 'react';
import ListItem from '../List/ListItem';

const UserDetail = ({ list, userId, selectedUser, showMoreSentenceBody, likeUp, getDetailListFromDB, history, setSelectedUserInfo}) => {
  return (
    <div className="user-detail">
      <div className="user-info">
        <img src={selectedUser.picture} alt="" />
        {selectedUser.name}
      </div>
      <p>등록문장({list.length? list.length : 0})</p>
      <ul className="result-list">
        {list.map((item, index) =>
          (<ListItem
            key={item.id}
            item={item}
            index={index}
            likeUp={likeUp}
            showMoreSentenceBody={showMoreSentenceBody}
            userId={userId}
            getDetailListFromDB={getDetailListFromDB}
            history={history}
            setSelectedUserInfo={setSelectedUserInfo}
          />)) }
      </ul>
    </div>
  );
}

export default UserDetail;