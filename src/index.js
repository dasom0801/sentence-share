import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import reducers from './store/index';
import App from './components/App/App';
import './styles/components/index.scss';


// 개발자 도구 사용 설정
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose; // 리덕스 개발자도구가 설치되어있지 않다면 일반 compose 를 사용

const middlewares = []; // 나중에 이 자리에 미들웨어 추가

const store = createStore(reducers, composeEnhancers(
  applyMiddleware(...middlewares)
));


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
