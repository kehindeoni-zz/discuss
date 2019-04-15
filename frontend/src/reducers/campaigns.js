import { campaignConstant } from '../constants/campaign';

const DEFAULT_STATE = {campaigns: [], fetching: false };

export function campaign(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case campaignConstant.GET_CAMPAIGNS_START:
      return Object.assign({}, state, { fetching: true });
    case campaignConstant.GET_CAMPAIGNS_SUCCESS:
      return Object.assign({}, state, { fetching: false, campaigns: action.campaigns });
    case campaignConstant.GET_CAMPAIGNS_FAILURE:
      return Object.assign({}, state, { fetching: false });
      case campaignConstant.READ_CAMPAIGN_START:
        return Object.assign({}, state, { fetching: true });
      case campaignConstant.READ_CAMPAIGN_SUCCESS:
        return Object.assign({}, state, { fetching: false, campaign: action.campaign });
      case campaignConstant.READ_CAMPAIGN_FAILURE:
        return Object.assign({}, state, { fetching: false });
    default:
      return state
  }
}

