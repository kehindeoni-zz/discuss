import { connect } from 'react-redux';
import CampaignChatPage from '../components/CampaignChatPage';
import { readCampaign, getRoomCredentials, disconnectOpentok } from '../actions';

const mapStateToProps = (state) => {
  const { campaign: { fetching, campaign } } = state;
  const { opentok: { subscribers, joinedVideoChat } } = state;
  const { alert: { errorMessage } } = state;
  console.log(state.alert.message, 'statattattat===', errorMessage, campaign)

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