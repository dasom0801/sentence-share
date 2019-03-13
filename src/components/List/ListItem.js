import React from 'react';
import {Link} from 'react-router-dom';



const ListItem = ({ item, showMoreSentenceBody, index, likeUp, userId}) => {
  // 날짜 형식 지정
  const time = item.time.toISOString().slice(0, 10);
  const body = item.showMore ? item.body : item.printBody;
  
  const handleMoreButton = () => {
    showMoreSentenceBody(index);
  }
  const handleLikeUp = () => {
    const {id, likes} = item;
    likeUp(index, id, likes, userId);
  }
  // 사용자가 해당 문장의 좋아요를 눌렀는지 확인
  const userLikeCheck = item.likeUser.indexOf(userId) > -1? "O": "X";
  
  // 본문이 긴 경우만 더보기 버튼을 출력한다.
  const moreBotton = item.showMoreButton ? <button onClick={() => { handleMoreButton() }} className="sentence more" type="button">더보기</button> : '';
  return ( 
    <li className="list-item">
      <div className="info">
        <Link to="/book-detail" ><img src={item.bookImage} alt={item.bookTitle + "책 표지"} className="book image" /></Link>
        <Link to="/book-detail"><p className="book title">{item.bookTitle}</p></Link>
        <div className="user">
          <img src={item.userInfo.picture} alt="사용자 프로필 이미지" className="user image" />
          <p className="user name">{item.userInfo.name}</p>
        </div>
        <p className="update-date">{time}</p>
      </div>
      <p className="sentence body">{body}</p>
      {moreBotton}
      <button className="likes" type="button" onClick={() => handleLikeUp()}>좋아요 <span>{item.likes} {userLikeCheck}</span></button>
    </li>
   );
}
 
export default ListItem;