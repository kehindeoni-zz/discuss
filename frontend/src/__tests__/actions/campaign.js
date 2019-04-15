import {
  getCampaignsSuccess,
  getCampaignsFailure,
  getCampaignsStart,
	readCampaignStart,
	readCampaignSuccess,
  readCampaignFailure
} from "../../actions/campaigns";


describe("Campaign Actions", () => {
  it("getCampaignsStart should create GET_CAMPAIGNS_START action", () => {
    expect(getCampaignsStart()).toEqual({
      type: "GET_CAMPAIGNS_START"
    });
	});
	
  it("getCampaignsSuccess should create GET_CAMPAIGNS_SUCCESS action", () => {
		const campaigns = [];
		expect(getCampaignsSuccess(campaigns)).toEqual({
				type: "GET_CAMPAIGNS_SUCCESS",
				campaigns
		});
  });

  it("getCampaignsFailure should create GET_CAMPAIGNS_FAILURE action", () => {
    expect(getCampaignsFailure()).toEqual({
      type: "GET_CAMPAIGNS_FAILURE"
    });
  });

  it("readCampaignStart should create READ_CAMPAIGN_START action", () => {
    expect(readCampaignStart()).toEqual({
      type: "READ_CAMPAIGN_START"
    });
  });

  it("readCampaignSuccess should create READ_CAMPAIGN_SUCCESS action", () => {
		const campaign = {};
    expect(readCampaignSuccess(campaign)).toEqual({
			type: "READ_CAMPAIGN_SUCCESS",
			campaign
    });
  });

  it("readCampaignFailure should create READ_CAMPAIGN_FAILURE action", () => {
    expect(readCampaignFailure()).toEqual({
      type: "READ_CAMPAIGN_FAILURE"
    });
  });
});


// export function campaign(state = DEFAULT_STATE, action) {
//   switch (action.type) {
//     case campaignConstant.GET_CAMPAIGNS_START:
//       return Object.assign({}, state, { fetching: true });
//     case campaignConstant.GET_CAMPAIGNS_SUCCESS:
//       return Object.assign({}, state, { fetching: false, campaigns: action.campaigns });
//     case campaignConstant.GET_CAMPAIGNS_FAILURE:
//       return Object.assign({}, state, { fetching: false });
//       case campaignConstant.READ_CAMPAIGN_START:
//         return Object.assign({}, state, { fetching: true });
//       case campaignConstant.READ_CAMPAIGN_SUCCESS:
//         return Object.assign({}, state, { fetching: false, campaign: action.campaign });
//       case campaignConstant.READ_CAMPAIGN_FAILURE:
//         return Object.assign({}, state, { fetching: false });
//     default:
//       return state
//   }
// }

