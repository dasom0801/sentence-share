import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import Intro from './Intro';
import NavBar from './NavBar';
// import ListMain from '../List/ListMain';
// import UserInfo from '../UserMenu/UserInfo';
// import UserSentence from '../UserMenu/UserSentence';
// import UserLikes from '../UserMenu/UserLikes';
import UserDetail from '../Detail/UserDetail';
import BookDetail from '../Detail/BookDetail';
import ListKeywordSearch from '../List/ListKeywordSearch';
import AddSentence from '../Add/AddSentence'
import UserContainer from '../../containers/UserContainer';
import ListContainer from '../../containers/ListContainer';


import * as actions from '../../store/actions';
import { firestore } from '../../modules/firebaseConfig';

import '../../styles/components/App.scss';

class App extends Component {
  componentDidMount() {
    const { changeLoginStatus, setUserInfo, setUserId} = this.props;
    
    // 사용자 로그인 여부 확인
    const user =JSON.parse(window.localStorage.getItem('user'));
    
    if (user) {
      changeLoginStatus(true);
      // DB에서 사용자 정보 가져오기
      firestore.collection('users').where("email", "==", user.email).get().then(querySnapshot => {
        const { email, name, picture } = querySnapshot.docs[0].data();
        const { id } = querySnapshot.docs[0];
        setUserInfo({email, name, picture});
        setUserId(id);
      });
    } else {
      changeLoginStatus(false);
      // 로그인하지 않은 사용자는 메인으로 이동
      this.props.history.push('/');
    }
  }
  render() {
    const { login, changeLoginStatus, setUserInfo, setUserId, history} = this.props;
    
    return login ? (
      <div className="App">
        <NavBar changeLoginStatus={changeLoginStatus} history={history}/>
        <Switch>
          <Route exact path="/" component={ListContainer} />
          <Route path="/info" component={UserContainer('UserInfo')} />
          <Route path="/sentence" component={UserContainer('UserSentence')} />
          <Route path="/likes" component={UserContainer('UserLikes')} />
          <Route path="/user-detail" component={UserDetail} />
          <Route path="/book-detail" component={BookDetail} />
          <Route path="/search" component={ListKeywordSearch} />
          <Route path="/add" component={AddSentence} />
        </Switch>
      </div>
    ) : (<Intro changeLoginStatus={changeLoginStatus} setUserInfo={setUserInfo} setUserId={setUserId}/>);
  }
}

const mapStateToProps = ({ user }) => {
  return {
    login: user.get('login'),
    id: user.get('id'),
    email: user.get('email'),
    name: user.get('name'),
    picture: user.get('picture'),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: (login) =>dispatch(actions.changeLoginStatus(login)),
    setUserInfo: (user) => dispatch(actions.setUserInfo(user)),
    setUserId: (id) => dispatch(actions.setUserId(id))
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));