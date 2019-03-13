import { connect } from 'react-redux';
import * as actions from '../store/actions';

import UserInfo from '../components/UserMenu/UserInfo';
import UserSentence from '../components/UserMenu/UserSentence';
import UserLikes from '../components/UserMenu/UserLikes';

const Components = {
  'UserInfo': UserInfo,
  'UserSentence': UserSentence,
  'UserLikes': UserLikes
}

const mapDispatchToProps = dispatch => {
  return {
    changeNameInput: (input) => {dispatch(actions.changeNameInput(input))},
    changeName: (name) => {dispatch(actions.changeName(name))},
    changeLoginStatus: (login) => dispatch(actions.changeLoginStatus(login)),
    setUserInfo: (user) => dispatch(actions.setUserInfo(user)),
    setUserId: (id) => dispatch(actions.setUserId(id))
  }
};

const mapStateToProps = ( {user}) => {
  return  {
    id: user.get('id'),
    email: user.get('email'),
    name: user.get('name'),
    nameInput: user.get('nameInput'),
    picture: user.get('picture')
  }
};

export default (componentName) => {
  return connect(mapStateToProps, mapDispatchToProps )(Components[componentName])
};