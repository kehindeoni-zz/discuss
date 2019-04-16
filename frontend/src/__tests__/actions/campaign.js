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
