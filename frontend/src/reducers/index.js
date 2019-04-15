import { combineReducers } from 'redux';
import { campaign } from './campaigns';
import { opentok } from './opentok';
import { alert } from './alert';

const rootReducer = combineReducers({
  alert,
  campaign,
  opentok
});

export default rootReducer;

