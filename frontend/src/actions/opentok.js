import OpentokService from '../services/opentok';
import { opentokConstant } from '../constants/opentok';
import { alertErrorMessage } from './alert';

export function disconnectOpentok() {
  return dispatch => {
    return OpentokService.disconnectOpentok();
  };
}

export function hideStartButton() {
  return {
    type: opentokConstant.HIDE_START_BUTTON
  }
}

export function initializeOpentokStart() {
  return {
    type: opentokConstant.INITIALIZE_OPENTOK_START
  };
}

export function updateSubscribersList(subscribers) {
  return {
    type: opentokConstant.UPDATE_SUBSCRIBERS_LIST,
    subscribers
  }
}

export function videoCallDisconnected() {
  return {
    type: opentokConstant.VIDEO_CALL_DISCONNECTED
  }
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
        dispatch(alertErrorMessage('Error Occured while trying to join the conversation'));
      });
  };
}

