import { alertsConstant } from '../constants';

export function alert(state={ errorMessage: '' }, action) {
  switch (action.type) {
    case alertsConstant.ALERT_ERROR_MESSAGE:
      return {
        errorMessage: action.message
      };
    case alertsConstant.CLEAR:
      return {};
    default:
      return state
  }
}
