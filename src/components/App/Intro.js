import React  from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import { auth, provider, firestore } from '../../modules/firebaseConfig';


const Intro = ({ changeLoginStatus, setUserInfo, setUserId}) => {
  // firebase를 통해서  google 계정으로 로그인
  const handleLogin = () => {
    auth.signInWithPopup(provider).then(result => {
      const {isNewUser} = result.additionalUserInfo;
      const token = result.credential.accessToken;
      const { email, picture, name } = result.additionalUserInfo.profile;
      
      if (isNewUser) {
        // 새로운 사용자라면 DB에 정보를 추가한 다음 문서 id를 받아서 state에 저장
        const setNewUser = (fn) => {
          const userInfo = {
            picture,
            name,
            email,
            userLikes: [],
          }
          firestore.collection('users').add(userInfo).then(docRef => fn(docRef.id));
        }
        setUserInfo({ email, name, picture });
        setNewUser(id => setUserId(id));
      } else {
        // 새로운 사용자가 아니라면 email로 query하여 정보를 찾는다.
        firestore.collection('users').where("email", "==", email).get().then(querySnapshot => {
          const { email, name, picture } = querySnapshot.docs[0].data();
          const { id } = querySnapshot.docs[0];
          setUserInfo({email, name, picture});
          setUserId(id);
        });
      }

      //state의 로그인 상태 변경, user 정보 저장
      changeLoginStatus(true);

      // 로그인 유지를 위하여 localstorage에 token을 저장한다. 
      window.localStorage.setItem('user', JSON.stringify({ token: token, email: email }));
    });
  }

  return (
    <div className="intro">
      <div className="setence-slide">
        <p>문장 슬라이드</p>
      </div>
      <div className="btn-login">
        <button onClick={() => {handleLogin()}}>Google로 시작하기</button>
      </div>
    </div>
    );
}
 
export default Intro;
