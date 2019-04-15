import { alert } from "../../reducers/alert";
import { alertsConstant } from '../../constants';

const initialState = {
  errorMessage: ''
};

describe("AlertReducer", () => {
  it("handles initial state", () => {
    expect(alert(undefined, {})).toEqual(initialState);
  });

  it("handles ALERT_ERROR_MESSAGE", () => {
    expect(alert(initialState, {
      type: alertsConstant.ALERT_ERROR_MESSAGE,
      errorMessage: 'This is an error'
    })).toEqual({
      ...initialState,
      errorMessage: 'This is an error'
    });
  });
});
