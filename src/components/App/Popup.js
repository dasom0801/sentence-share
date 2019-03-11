import React from 'react';

const Popup = () => {
  return ( 
    <div className="popup">
      <div className="message-box">
        <p>~~ 하시겠습니까?</p>
        <button className="cancel">아니오</button>
        <button className="submit">네</button>
      </div>
    </div>
   );
}
 
export default Popup;