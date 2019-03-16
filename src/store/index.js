import { combineReducers } from 'redux';
import { common, user, list, book, detail} from './reducers';


const reducers = combineReducers({
  common, user, list, book, detail
});

export default reducers;