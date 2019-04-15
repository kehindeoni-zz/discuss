import { alertErrorMessage } from '../../actions/alert';
import { opentokConstant } from '../../constants';
  
describe("alertActions", () => {
  it("alertErrorMessage should create a ALERT_ERROR_MESSAGE", () => {
    const errorMessage = 'This is an error';
    expect(alertErrorMessage(errorMessage)).toEqual({
      type: opentokConstant.ALERT_ERROR_MESSAGE,
      errorMessage
    });
  });
});
  
  