import OpentokService from '../services/opentok';
import { opentokConstant } from '../constants/opentok';

export function initializeOpentokStart() {
  return {
    type: opentokConstant.INITIALIZE_OPENTOK_START
  };
}

export function initializeOpentokSuccess(campaign) {
  return {
    type: opentokConstant.INITIALIZE_OPENTOK_SUCCESS,
    campaign
  };
}

export function initializeOpentokFailure() {
  return {
    type: opentokConstant.INITIALIZE_OPENTOK_FAILURE
  };
}

export function updateSubscribersList(subscribers) {
  return {
    type: opentokConstant.UPDATE_SUBSCRIBERS_LIST,
    subscribers
  }
}

export function disconnectOpentok() {
  return OpentokService.disconnectOpentok();
}

export function initializeOpentok(credentials) {
  return dispatch => {
    return OpentokService.initialize(credentials, dispatch);
  };
}

export function getRoomCredentials(roomId) {
  return dispatch => {
    dispatch(initializeOpentokStart());
    return OpentokService.getRoom(roomId)
      .then((response) => {
        dispatch(initializeOpentok(response.data));
      })
      .catch((error) => {
        dispatch(initializeOpentokFailure());
      });
  };
}

