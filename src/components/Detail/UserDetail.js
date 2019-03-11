import React from 'react';
import ListItem from '../List/ListItem';

const UserDetail = () => {
  return (
    <div className="user-detail">
      <div className="user-info">
      </div>
      <p>등록문장(15)</p>
      <ul className="result-list">
        <li>
          <ListItem />
        </li>
      </ul>
    </div>
  );
}

export default UserDetail;