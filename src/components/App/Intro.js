import React  from 'react';


const Intro = ({ loginWithFirebase }) => {
  return (
    <div className="intro">
      <div className="setence-slide">
        <p>문장 슬라이드</p>
      </div>
      <div className="btn-login">
        <button onClick={() => { loginWithFirebase()}}>Google로 시작하기</button>
      </div>
    </div>
    );
}
 
export default Intro;
