import React from 'react';
import ListItem from '../List/ListItem';

const UserDetail = ({ list, userId, selectedUser, showMoreSentenceBody, likeCountUp, getDetailListFromDB, history, setSelectedUserInfo}) => {
  return (
    <div className="user-detail">
      <div className="user-info">
        <img src={selectedUser.picture} alt="" />
        {selectedUser.name}
      </div>
      <p>등록문장({list.size? list.size : 0})</p>
      <ul className="result-list">
        {list.map((item, index) =>
          (<ListItem
            key={item.id}
            item={item}
            index={index}
            likeCountUp={likeCountUp}
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