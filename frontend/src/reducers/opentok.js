import { opentokConstant } from '../constants/opentok';

const DEFAULT_STATE = { opentokCredentials: {}, isFetching: false, subscribers: [] };

export function opentok(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case opentokConstant.INITIALIZE_OPENTOK_START:
      return Object.assign({}, state, { fetching: true, viewingopentok: false });
    case opentokConstant.INITIALIZE_OPENTOK_SUCCESS:
      return Object.assign({}, state, { fetching: false, opentoks: action.opentoks, viewingopentok: false });
    case opentokConstant.INITIALIZE_OPENTOK_FAILURE:
      return Object.assign({}, state, { fetching: false, viewingopentok: false });
    case opentokConstant.UPDATE_SUBSCRIBERS_LIST:
        return Object.assign({}, state, { subscribers: action.subscribers });
    default:
      return state
  }
}

