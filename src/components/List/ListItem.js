import React from 'react';
import {Link} from 'react-router-dom';

const ListItem = ({ item, showMoreSentenceBody, index, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo}) => {
  // 날짜 형식 지정
  const time = item.time.toISOString().slice(0, 10);
  const body = item.showMore ? item.body : item.printBody;
  const bookLinkTo = `/book-detail/${item.bookId.replace('/books/','')}`;
  const userLinkTo = `/user-detail/${item.userInfo.id.replace('/users/', '')}`;

  // 사용자가 해당 문장의 좋아요를 눌렀는지 확인
  const userLikeCheck = item.likeUser.indexOf(userId) > -1? "O": "X";
  
  // 링크를 눌렀을 때 상세페이지로 이동하면서 DB를 호출한다.
  const handleDetailList = ({filter, id, user}) => {
    getDetailListFromDB({filter, id, orderBy: 'updateDate', userId});
    filter === 'user' && setSelectedUserInfo(user);
    filter === 'book' ? history.push(bookLinkTo) : history.push(userLinkTo);
  }

  // 본문이 긴 경우만 더보기 버튼을 출력한다.
  const moreBotton = item.showMoreButton ? <button onClick={() => { showMoreSentenceBody(index) }} className="sentence more" type="button">더보기</button> : '';
  return ( 
    <li className="list-item">
      <div className="info">
        <Link to={bookLinkTo} 
          onClick={(event) => {
            event.preventDefault();
            handleDetailList({ filter: 'book', id: item.bookId.replace('/books/', '') })
          }}>
          <img src={item.bookImage} alt={item.bookTitle + "책 표지"} className="book image"/>
        </Link>
        <Link to={bookLinkTo}><p className="book title" 
          onClick={(event) =>{ 
            event.preventDefault();
            handleDetailList({ filter: 'book', id: item.bookId.replace('/books/','')})
          }}
        >{item.bookTitle}</p></Link>
        <Link to={userLinkTo} className="user" 
          onClick={(event) =>{ 
            event.preventDefault();
            handleDetailList({ filter: 'user', id: item.userInfo.id.replace('/users/',''), user: item.userInfo })
          }}
        >
          <img src={item.userInfo.picture} alt="사용자 프로필 이미지" className="user image" />
          <p className="user name">{item.userInfo.name}</p>
        </Link>
        <p className="update-date">{time}</p>
      </div>
      <p className="sentence body">{body}</p>
      {moreBotton}
      <button className="likes" type="button" onClick={() => likeCountUp(index, item.id, item.likes, userId)}>좋아요 <span>{item.likes} {userLikeCheck}</span></button>
    </li>
   );
}
 
export default ListItem;