import React from 'react';

const ListSort = ({ isSortOpen, toggleSort, getSentenceListFromDB, orderBy}) => {
  const handleSortClick = (clickItem) => {
    if (clickItem !== orderBy) {
      getSentenceListFromDB(clickItem);
    }
    toggleSort();
  }
  const selectList = isSortOpen && (
    <ul className="select-list">
      <li className="select-item"><button onClick={() => {handleSortClick('updateDate')}}>최신순</button></li>
      <li className="select-item"><button onClick={()=> {handleSortClick('likes')}}>인기순</button></li>
    </ul>
  );
  const orderName = orderBy === "likes" ? "인기순" : "최신순" 
  return ( 
    <div className="list-sort">
      <button className="selected" type="button" onClick={() => toggleSort()}>{orderName}</button>
      {selectList}
    </div>
   );
}
 
export default ListSort;