import { combineReducers } from 'redux';
import { campaign } from './campaigns';
import { opentok } from './opentok';

const rootReducer = combineReducers({
  campaign,
  opentok
});

export default rootReducer;

