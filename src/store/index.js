import { combineReducers } from 'redux';
import {common, user, list, book} from './reducers';


const reducers = combineReducers({
  common, user, list, book
});

export default reducers;