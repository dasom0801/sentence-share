import React from 'react';
// import ListSort from '../List/ListSort';
import ListItem from '../List/ListItem';
// import AddButton from '../Add/AddButton';

const UserLikes = ({ list, showMoreSentenceBody, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo}) => {

  const printList = list.map((item, index)=> (
    <ListItem 
      key={item.id} 
      item={item} 
      index={index}
      showMoreSentenceBody={showMoreSentenceBody}
      likeCountUp={likeCountUp}
      userId={userId}
      getDetailListFromDB={getDetailListFromDB}
      history={history}
      setSelectedUserInfo={setSelectedUserInfo}
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