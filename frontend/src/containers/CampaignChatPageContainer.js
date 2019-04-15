import { connect } from 'react-redux';
import CampaignChatPage from '../components/CampaignChatPage';
import { readCampaign, getRoomCredentials, disconnectOpentok } from '../actions';

const mapStateToProps = (state) => {
  const { fetching, campaign } = state.campaign;
  const { subscribers, joinedVideoChat } = state.opentok;
  const { errorMessage } = state.alert;

  return {
    fetching,
    campaign,
    subscribers,
    joinedVideoChat,
    errorMessage
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