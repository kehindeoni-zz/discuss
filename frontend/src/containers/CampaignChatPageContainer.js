import { connect } from 'react-redux';
import CampaignChatPage from '../components/CampaignChatPage';
import { readCampaign} from '../actions';

const mapStateToProps = (state) => {
  const { campaign } = state;
  console.log(campaign, 'jfjjfjjf')
  return {
    fetching: campaign.fetching,
    campaign: campaign.campaign
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    readCampaign: (campaignId) => { dispatch(readCampaign(campaignId))}
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignChatPage);