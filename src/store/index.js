import { combineReducers } from 'redux';
import {user, list} from './reducers';


const reducers = combineReducers({
  user, list
});

export default reducers;