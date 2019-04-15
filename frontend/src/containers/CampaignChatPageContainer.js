import { connect } from 'react-redux';
import CampaignChatPage from '../components/CampaignChatPage';
import { readCampaign, getRoomCredentials, disconnectOpentok } from '../actions';

const mapStateToProps = (state) => {
  const { fetching, campaign } = state.campaign;
  const { subscribers } = state.opentok;

  return {
    fetching: fetching,
    campaign: campaign,
    subscribers: subscribers
  }
}
  
const mapDispatchToProps = (dispatch) => {
  return {
    readCampaign: (campaignId) => { dispatch(readCampaign(campaignId))},
    startVideoChat: (roomId) => {dispatch((getRoomCredentials(roomId)))},
    endVideoChat: () => {dispatch(disconnectOpentok())}
  }
}
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignChatPage);