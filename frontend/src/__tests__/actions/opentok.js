import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import OpentokService from '../../services/opentok';
import { opentokConstant } from '../../constants';
import {
  videoCallDisconnected,
  hideStartButton,
  updateSubscribersList,
  disconnectOpentok,
  initializeOpentokStart,
  initializeOpentok,
  getRoomCredentials,
} from "../../actions/opentok";

describe("Test actions with dispatch", () => {
  let middlewares, mockStore, store;
  beforeEach(()=> {
    middlewares = [ thunk ];
    mockStore = configureMockStore(middlewares);
    store = mockStore({});
  });

  it("creates disconnectOpenTok action", () => {
    OpentokService.disconnectOpentok = jest.fn();
    const disconnectOpenTokAction = disconnectOpentok();
    disconnectOpenTokAction(store.dispatch);

    expect(OpentokService.disconnectOpentok).toHaveBeenCalled();
  });

  it("creates initializeOpentok action", () => {
    const credentials = {};
    OpentokService.initialize = jest.fn();
    const initializeOpentokAction = initializeOpentok(credentials);
    initializeOpentokAction(store.dispatch);

    expect(OpentokService.initialize).toHaveBeenCalledWith(credentials, store.dispatch);
  });

  it("creates getRoomCredentials action", () => {
    const response = {};
    OpentokService.getRoom = (response) => {
      return new Promise((resolve, reject) => {
        resolve(response);
      });
    };

    store.dispatch(getRoomCredentials(''))
      .then(() => {
        expect(store.getActions()).toEqual([initializeOpentokStart()]
      )
    });
  });
});

describe("OpenTokActions", () => {
  it("initializeOpentokStart should create INITIALIZE_OPENTOK_START action", () => {
    expect(initializeOpentokStart()).toEqual({
      type: opentokConstant.INITIALIZE_OPENTOK_START
    });
  });

  it("videoCallDisconnected should create VIDEO_CALL_DISCONNECTED action", () => {
    expect(videoCallDisconnected()).toEqual({
      type: opentokConstant.VIDEO_CALL_DISCONNECTED
    });
  });

  it("hideStartButton should create HIDE_START_BUTTON action", () => {
    expect(hideStartButton()).toEqual({
      type: opentokConstant.HIDE_START_BUTTON
    });
  });
 
  it("updateSubscribersList should create UPDATE_SUBSCRIBERS_LIST action", () => {
    const subscribers = ['003003-3399393-399'];
    expect(updateSubscribersList(subscribers)).toEqual({
      type: opentokConstant.UPDATE_SUBSCRIBERS_LIST,
      subscribers
    });
  });
});



