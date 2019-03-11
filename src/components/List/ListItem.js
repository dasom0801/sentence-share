import React, {Fragment} from 'react';

const ListItem = () => {
  return ( 
    <Fragment className="list-item">
      <li>
        <div className="info">
          <img src="" alt="책표지" className="book image" />
          <p className="book title">Title</p>
          <div className="user">
            <img src="" alt="아바타" className="user image" />
            <p className="user name">사용자</p>
          </div>
          <p className="update-date">YYYY-MM-DD hh:mm</p>
        </div>
        <p className="sentence body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae harum numquam ab enim explicabo facilis obcaecati rem velit, cumque quam esse corporis ipsa earum officiis similique nemo nam! Iste.</p>
        <button className="sentence more" type="button">더보기</button>
        <button className="likes" type="button">좋아요 <span>1개</span></button>
      </li>
    </Fragment>
   );
}
 
export default ListItem;