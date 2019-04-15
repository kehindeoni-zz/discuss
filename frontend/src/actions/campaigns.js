import campaignService from '../services/campaigns';
import { campaignConstant } from '../constants';
import { alertErrorMessage } from './alert';

export function getCampaignsStart() {
  return {
    type: campaignConstant.GET_CAMPAIGNS_START
  };
}

export function getCampaignsSuccess(campaigns) {
  return {
    type: campaignConstant.GET_CAMPAIGNS_SUCCESS,
    campaigns
  };
}

export function getCampaignsFailure() {
  return {
    type: campaignConstant.GET_CAMPAIGNS_FAILURE
  };
}

export function readCampaignStart() {
  return {
    type: campaignConstant.READ_CAMPAIGN_START
  };
}

export function readCampaignSuccess(campaign) {
  return {
    type: campaignConstant.READ_CAMPAIGN_SUCCESS,
    campaign
  };
}

export function readCampaignFailure() {
  return {
    type: campaignConstant.READ_CAMPAIGN_FAILURE
  };
}

export function getCampaigns() {
  return dispatch => {
    dispatch(getCampaignsStart());
    return campaignService.list()
      .then((response) => {
        dispatch(getCampaignsSuccess(response.data.data));
      })
      .catch(() => {
        dispatch(alertErrorMessage('Error loading campaigns'));
        dispatch(getCampaignsFailure());
      });
  };
}

export function readCampaign(campaignId, props) {
  return dispatch => {
    dispatch(readCampaignStart());
    return campaignService.read(campaignId)
      .then((response) => {
        if (props) {
          props.history.push(`/discussion/${campaignId}`)
        }
        dispatch(readCampaignSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(alertErrorMessage('Error loading campaigns'));
        dispatch(readCampaignFailure());
      });
  };
}
