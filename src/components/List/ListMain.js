import React from 'react';
import ListItem from './ListItem';
import ListSort from './ListSort';
import AddButton from '../Add/AddButton';

const MainList = ({ getSentenceListFromDB, lastItem, list, showMoreSentenceBody, toggleSort, showSort, orderBy}) => {
  const handleMoreClick = () => {
    getSentenceListFromDB(orderBy, lastItem);
  }
  
  const printList = list && list.map((item, index) => <ListItem key={item.id} item={item} index={index} showMoreSentenceBody={showMoreSentenceBody}/>)
  return ( 
    <div className="main-list">
      <p>MainList</p>
      <ListSort 
        toggleSort={toggleSort} 
        showSort={showSort} 
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