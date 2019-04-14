import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { getCampaigns, readCampaign} from '../actions';

const mapStateToProps = (state) => {
  const { campaign } = state;
  return {
    fetching: campaign.fetching,
    campaigns: campaign.campaigns,
    campaign: campaign.campaign,
    viewingCampaign: campaign.viewingCampaign
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    getCampaigns: () => { dispatch(getCampaigns())},
    readCampaign: (campaignId, props) => { dispatch(readCampaign(campaignId, props))}
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);