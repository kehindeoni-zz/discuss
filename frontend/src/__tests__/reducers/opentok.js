import { opentok } from "../../reducers/opentok";
import { opentokConstant } from '../../constants';

const initialState = {
  subscribers: [],
  fetching: false
};

describe("OpentokReducer", () => {
  it("handles initial state", () => {
    expect(opentok(undefined, {})).toEqual(initialState);
  });

  it("handles INITIALIZE_OPENTOK_START", () => {
    expect(opentok(initialState, {
      type: opentokConstant.INITIALIZE_OPENTOK_START
    })).toEqual({
      ...initialState,
      fetching: true,
      errorMessage: ''
    });
  });

  it("handles UPDATE_SUBSCRIBERS_LIST", () => {
    expect(opentok(initialState, {
      type: opentokConstant.UPDATE_SUBSCRIBERS_LIST,
      subscribers: []
    })).toEqual({
      ...initialState,
      subscribers: []
    });
  });

  it("handles HIDE_START_BUTTON", () => {
    expect(opentok(initialState, {
      type: opentokConstant.HIDE_START_BUTTON
    })).toEqual({
      ...initialState,
      joinedVideoChat: true
    });
  });

  it("handles VIDEO_CALL_DISCONNECTED", () => {
    expect(opentok(initialState, {
      type: opentokConstant.VIDEO_CALL_DISCONNECTED
    })).toEqual({
      ...initialState,
      joinedVideoChat: false,
      errorMessage: ''
    });
  });
});

