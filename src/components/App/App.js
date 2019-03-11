import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from './Intro.js';
import NavBar from './NavBar';
import ListMain from '../List/ListMain';
import UserSentence from '../UserMenu/UserSentence';
import UserLikes from '../UserMenu/UserLikes';
import UserDetail from '../Detail/UserDetail';
import BookDetail from '../Detail/BookDetail';
import ListKeywordSearch from '../List/ListKeywordSearch';
import UserInfo from '../UserMenu/UserInfo';
import AddSentence from '../Add/AddSentence'

import '../../styles/components/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Intro />
        <Switch>
          <Route exact path="/" component={ListMain} />
          <Route path="/sentence" component={UserSentence} />
          <Route path="/likes" component={UserLikes} />
          <Route path="/user-detail" component={UserDetail} />
          <Route path="/book-detail" component={BookDetail} />
          <Route path="/search" component={ListKeywordSearch} />
          <Route path="/info" component={UserInfo} />
          <Route path="/add" component={AddSentence} />
        </Switch>
      </div>
    );
  }
}

export default App;
