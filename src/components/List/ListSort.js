import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ListSort = ({ isSortOpen, toggleSort, getSentenceListFromDB, orderBy, getListDB, getDetailListFromDB, getUserLikesListDB, getUserSentenceListDB}) => {
  const handleSortClick = (clickItem) => {
    
    // 현재의 정렬을 선택했는지 여부 확인
    if (clickItem !== orderBy) {
      // 정렬 순서를 바꿔서 DB 재요청
      if (getListDB) {
        getListDB.orderBy = clickItem;
        if(getListDB.filter === 'book' || getListDB.filter === 'user') {
          getDetailListFromDB(getListDB);
        } else if (getListDB.filter === 'sentence') {
          getUserSentenceListDB(getListDB);
        } else if (getListDB.filter === 'likes') {
          getUserLikesListDB(getListDB);
        }
      } else {
        getSentenceListFromDB(clickItem);
      }
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
      <button className="toggle-button" type="button" onClick={() => toggleSort()}>{orderName} 
        {isSortOpen ? 
        <FontAwesomeIcon className="arrow-icon" icon={faAngleUp} aria-label="정렬 선택 열기" /> :
          <FontAwesomeIcon className="arrow-icon" icon={faAngleDown} aria-label="정렬 선택 닫기" />}</button>
      {selectList}
    </div>
   );
}
 
export default ListSort;