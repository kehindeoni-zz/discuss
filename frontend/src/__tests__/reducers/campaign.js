import { campaignConstant } from '../../constants';
import { campaign } from "../../reducers/campaigns";

const initialState = {
  campaigns: [],
  fetching: false
};

describe("CampaignReducer", () => {
  it("handles initial state", () => {
    expect(campaign(undefined, {})).toEqual(initialState);
  });

  it("handles GET_CAMPAIGNS_START", () => {
    expect(campaign(initialState, {
      type: campaignConstant.GET_CAMPAIGNS_START
    })).toEqual({
      ...initialState,
      fetching: true
    });
  });

  it("handles GET_CAMPAIGNS_SUCCESS", () => {
    expect(campaign(initialState, {
      type: campaignConstant.GET_CAMPAIGNS_SUCCESS,
      campaigns: []
    })).toEqual({
      ...initialState,
      campaigns: []
    });
  });

  it("handles GET_CAMPAIGNS_FAILURE", () => {
    expect(campaign(initialState, {
      type: campaignConstant.GET_CAMPAIGNS_FAILURE
    })).toEqual({
      ...initialState,
      fetching: false
    });
  });

  it("handles READ_CAMPAIGN_START", () => {
    expect(campaign(initialState, {
      type: campaignConstant.READ_CAMPAIGN_START
    })).toEqual({
      ...initialState,
      fetching: true
    });
  });

  it("handles READ_CAMPAIGN_SUCCESS", () => {
    expect(campaign(initialState, {
      type: campaignConstant.READ_CAMPAIGN_SUCCESS,
      campaign: {}
    })).toEqual({
      ...initialState,
      fetching: false,
      campaign: {}
    });
  });

  it("handles READ_CAMPAIGN_FAILURE", () => {
    expect(campaign(initialState, {
      type: campaignConstant.READ_CAMPAIGN_FAILURE
    })).toEqual({
      ...initialState,
      fetching: false
    });
  });
});



