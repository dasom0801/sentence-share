import React from 'react';

const Popup = ({ popupMsg, togglePopup, target, resetBookState, history}) => {
  const handlePopupSubmit= () =>{
    togglePopup('');
    if(target === 'book') {
      resetBookState();
      history.push('/');
    }
  }
  return ( 
    <div className="popup">
      <div className="message-box">
        <p>{popupMsg}하시겠습니까?</p>
        <button className="cancel" onClick={() => { togglePopup(popupMsg)}}>아니오</button>
        <button className="submit"onClick={() => { handlePopupSubmit()}} >네</button>
      </div>
    </div>
   );
}
 
export default Popup;