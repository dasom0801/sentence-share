import React from 'react';
import ListItem from './ListItem';
import ListSort from './ListSort';
import AddButton from '../Add/AddButton';

const MainList = () => {
  return ( 
    <div className="main-list">
      <p>MainList</p>
      <ListSort />
      <ul className="senetence-list">
        <ListItem />
      </ul>
      <AddButton />
    </div>
   );
}
 
export default MainList;