import React from 'react';
import ListSort from '../List/ListSort';
import ListItem from '../List/ListItem';
import AddButton from '../Add/AddButton';

const UserLikes = () => {
  return ( 
    <div className="user-likes">
      <p>내가 좋아한 문장</p>
      <p>1건</p>
      <ListSort />
      <ListItem />
      <AddButton />
    </div>
   );
}
 
export default UserLikes;