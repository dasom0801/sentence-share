import { combineReducers } from 'redux';
import {common} from './reducers/commonReducer';
import {book} from './reducers/bookReducer';
import { detail} from './reducers/detailReducer.js';
import {list} from './reducers/listReducer';
import {user} from './reducers/userReducer';


const reducers = combineReducers({
  common, user, list, book, detail
});

export default reducers;