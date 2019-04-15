import { opentokConstant } from '../constants';

const DEFAULT_STATE = { subscribers: [] };

export function opentok(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case opentokConstant.INITIALIZE_OPENTOK_START:
      return Object.assign({}, state, { fetching: true, errorMessage: '' });
    case opentokConstant.UPDATE_SUBSCRIBERS_LIST:
      return Object.assign({}, state, { subscribers: action.subscribers });
    case opentokConstant.HIDE_START_BUTTON:
      return Object.assign({}, state, { joinedVideoChat: true });
    case opentokConstant.VIDEO_CALL_DISCONNECTED:
      return Object.assign({}, state, { joinedVideoChat: false, errorMessage: '' });
    default:
      return state
  }
}

