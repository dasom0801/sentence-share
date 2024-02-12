import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import Intro from './Intro';
import NavBar from './NavBar';
import ListKeywordSearch from '../List/ListKeywordSearch';
import ListContainer from '../../containers/ListContainer';
import BookContainer from '../../containers/BookContainer';
import DetailContainer from '../../containers/DetailContainer';
import UserContainer from '../../containers/UserContainer';
import Loading from './Loading';

const App = () => {
  return (
    <div>
      <NavBar />
      <div className='container'>
        {/* <Routes> */}
        {/* <Route path='/' element={<ListContainer />} />
        <Route path='/info' element={<UserContainer />} />
        <Route path='/sentence' element={<UserContainer />} />
        <Route path='/likes' element={<UserContainer />} />
        <Route path='/user-detail/:id' element={<DetailContainer />} />
        <Route path='/book-detail/:id' element={<DetailContainer />} />
        <Route path='/search' element={<ListKeywordSearch />} />
        <Route path='/add' element={<BookContainer />} />
        <Route path='/modify/:id' element={<BookContainer />} /> */}
        {/* </Routes> */}
      </div>
    </div>
  );
};

export default App;
