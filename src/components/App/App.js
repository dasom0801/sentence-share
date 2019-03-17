import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import Intro from './Intro';
import NavBar from './NavBar';
import ListKeywordSearch from '../List/ListKeywordSearch';
import ListContainer from '../../containers/ListContainer';
import BookContainer from '../../containers/BookContainer';
import DetailContainer from '../../containers/DetailContainer';
import UserContainer from '../../containers/UserContainer';

import * as actions from '../../store/actions/index';

import '../../styles/components/App.scss';

class App extends Component {
  componentDidMount() {
    const { changeLoginStatus, getFirebaseUserData} = this.props;
    
    // 사용자 로그인 여부 확인
    const user =JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      changeLoginStatus(true);
      // DB에서 사용자 정보 가져오기
      getFirebaseUserData({email: user.email, getListDB: false});
    } else {
      changeLoginStatus(false);
      // 로그인하지 않은 사용자는 메인으로 이동
      this.props.history.push('/');
    }
  }
  render() {
    const { history, loginStatus, changeLoginStatus, loginWithFirebase, userId} = this.props;
    
    return loginStatus ? (
      <div className="App">
        <NavBar changeLoginStatus={changeLoginStatus} history={history} userId={userId}/>
        <Switch>
          <Route exact path="/" component={ListContainer} />
          <Route path="/info" component={UserContainer} />
          <Route path="/sentence" component={UserContainer} />
          <Route path="/likes" component={UserContainer} />
          <Route path="/user-detail/:id" component={DetailContainer} />
          <Route path="/book-detail/:id" component={DetailContainer} />
          <Route path="/search" component={ListKeywordSearch} />
          <Route path="/add" component={BookContainer} />
        </Switch>
      </div>
    ) : (<Intro loginWithFirebase={loginWithFirebase}/>);
  }
}

const mapStateToProps = ({ user }) => {
  return {
    loginStatus: user.get('loginStatus'),
    userId: user.get('id'),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: (login) =>dispatch(actions.changeLoginStatus(login)),
    loginWithFirebase: () => dispatch(actions.loginWithFirebase()),
    getFirebaseUserData: (payload) => dispatch(actions.getFirebaseUserData(payload)),
    getUserLikesListDB: (payload) => dispatch(actions.getUserLikesListDB(payload)),
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));