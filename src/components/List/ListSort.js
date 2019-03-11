import React from 'react';

const ListSort = () => {
  return ( 
    <div className="list-sort">
      <button className="selected" type="button">최신순</button>
      <ul className="select-list">
        <li className="select-item"><button>최신순</button></li>
        <li className="select-item"><button>인기순</button></li>
      </ul>
    </div>
   );
}
 
export default ListSort;