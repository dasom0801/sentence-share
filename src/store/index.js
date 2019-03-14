import { combineReducers } from 'redux';
import {user, list, book} from './reducers';


const reducers = combineReducers({
  user, list, book
});

export default reducers;