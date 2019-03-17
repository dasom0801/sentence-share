import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

import UserInfo from '../components/UserMenu/UserInfo';
import UserSentence from '../components/UserMenu/UserSentence';
import UserLikes from '../components/UserMenu/UserLikes';


class UserContainer extends Component {
  componentDidMount() {
    const { path } = this.props.match, { userId, getFirebaseUserData } = this.props;
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!userId) {
      getFirebaseUserData({
        email: user.email,
        getListDB: {
          orderBy: 'updateDate',
          startItem: false,
        },
        page: path.replace('/', '')
      });
    }
  }
  render() { 
    const {path} = this.props.match;
    let printComponent = false;
    switch (path) {
      case '/info':
        printComponent = <UserInfo {...this.props} />;
        break;
      case '/likes':
        printComponent = <UserLikes {...this.props} />;
        break;
      case '/sentence':
        printComponent = <UserSentence {...this.props} />;
        break;
      default:
        break;
    }
    return ( 
      <Fragment>
        {printComponent}
      </Fragment>
     );
  }
}


const mapStateToProps = ({ user, list }) => {
  return {
    userId: user.get('id'),
    email: user.get('email'),
    name: user.get('name'),
    nameInput: user.get('nameInput'),
    picture: user.get('picture'),
    list: list.get('list'),
  }
};

 
const mapDispatchToProps = dispatch => {
  return {
    changeNameInput: (input) => {dispatch(actions.changeNameInput(input))},
    changeName: (name) => {dispatch(actions.changeName(name))},
    changeLoginStatus: (login) => dispatch(actions.changeLoginStatus(login)),
    setUserInfo: (user) => dispatch(actions.setUserInfo(user)),
    setUserId: (id) => dispatch(actions.setUserId(id)),
    getFirebaseUserData: (payload) => dispatch(actions.getFirebaseUserData(payload)),
    showMoreSentenceBody: (index) => { dispatch(actions.showMoreSentenceBody(index)) },
    likeCountUp: (index, id, likes, userId, orderBy) => { dispatch(actions.likeCountUp(index, id, likes, userId, orderBy)) },
    getDetailListFromDB: (payload) => { dispatch(actions.getDetailListFromDB(payload)) },
    setSelectedUserInfo: (user) => { dispatch(actions.setSelectedUserInfo(user)) },
    userDelete: (userId) => { dispatch(actions.userDelete(userId)) },
    setChangedName: (userInfo) => { dispatch(actions.setChangedName(userInfo)) },
  }
};

export default connect(mapStateToProps, mapDispatchToProps )(UserContainer);
