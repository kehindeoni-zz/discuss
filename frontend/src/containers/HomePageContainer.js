import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { getCampaigns, readCampaign} from '../actions';

const mapStateToProps = (state) => {
  const { campaign, campaigns, fetching, viewingCampaign } = state.campaign;
  const { errorMessage } = state.alert;

  return {
    fetching,
    campaigns,
    campaign,
    errorMessage,
    viewingCampaign
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