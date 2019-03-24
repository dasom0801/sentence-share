import React from 'react';
import {Link} from 'react-router-dom';
import ListModifyButton from './ListModifyButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faChevronCircleDown as CircleDown} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular} from '@fortawesome/fontawesome-free-regular'; 

import '../../styles/components/ListItem.scss';


const ListItem = ({ item, showMoreSentenceBody, index, likeCountUp, userId, getDetailListFromDB, history, setSelectedUserInfo, toggleModifyButton, isModifyOpen, togglePopup, popupMsg, showPopup, match, deleteListItem, selectSearchedBook, changeSentenceTextarea, selectedModifyItem}) => {
  // 날짜 형식 지정
  const time = item.time.toISOString().slice(0, 10);
  const body = item.showMore ? item.body : item.printBody;
  const bookLinkTo = `/book-detail/${item.bookId.replace('/books/','')}`;
  const userLinkTo = `/user-detail/${item.userInfo.id.replace('/users/', '')}`;
  
  // 링크를 눌렀을 때 상세페이지로 이동하면서 DB를 호출한다.
  const handleDetailList = ({ filter, user, bookId}) => {
    getDetailListFromDB({filter, orderBy: 'updateDate', userId, bookId, user});
    filter === 'user' && setSelectedUserInfo(user);
    filter === 'book' ? history.push(bookLinkTo) : history.push(userLinkTo);
  }

 // 수정 버튼, 로그인한 사용자가 작성한 아이템에서만 표시된다.
  const modifyButton = item.userInfo.id.indexOf(userId) > -1
    && <ListModifyButton userId={userId} toggleModifyButton={toggleModifyButton} isModifyOpen={isModifyOpen} togglePopup={togglePopup} popupMsg={popupMsg} showPopup={showPopup} match={match} deleteListItem={deleteListItem} history={history} sentenceItem={item} selectSearchedBook={selectSearchedBook} changeSentenceTextarea={changeSentenceTextarea} selectedModifyItem={selectedModifyItem}/>

return ( 
    <li className="list-item">
      <div className="info">
       {modifyButton}
        <Link to={bookLinkTo} 
          onClick={(event) => {
            event.preventDefault();
            handleDetailList({ filter: 'book', bookId: item.bookId.replace('/books/', '') })
          }}>
          <img src={item.bookImage} alt={item.bookTitle + "책 표지"} className="book image"/>
        </Link>
        <Link to={bookLinkTo}><p className="book title" 
          onClick={(event) =>{ 
            event.preventDefault();
            handleDetailList({ filter: 'book', bookId: item.bookId.replace('/books/','')})
          }}
        >{item.bookTitle}</p></Link>
        <div className="user date">
          <Link to={userLinkTo} className="user" 
            onClick={(event) =>{ 
              event.preventDefault();
              handleDetailList({ filter: 'user', user: item.userInfo })
            }}
          >
          <img src={item.userInfo.picture} alt="사용자 프로필 이미지" className="user image" />
          <p className="user name">{item.userInfo.name}</p>
          </Link>
          <p className="update-date">{time}</p>
        </div>
      </div>
      <div className="sentence">
        <p className="body">{body}</p>
        {item.showMoreButton ? <button onClick={() => { showMoreSentenceBody(index) }} className="more" type="button"><FontAwesomeIcon icon={CircleDown} aria-label="문장 더보기" />더보기</button> : ''}
      </div>
      
      <button className="likes" type="button" onClick={() => likeCountUp(index, item.id, item.likes, userId)}> 
        {item.likeUser.indexOf(userId) > -1 ? <FontAwesomeIcon icon={faHeart} aria-label="좋아요 선택" /> : <FontAwesomeIcon icon={faHeartRegular} aria-label="좋아요 선택하지 않음" /> }
        {item.likes ? <span> 좋아요 {item.likes}개 </span> : ''}
      </button>
    </li>
   );
}
 

export default ListItem;