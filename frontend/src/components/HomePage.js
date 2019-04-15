import React, { Component } from 'react';
import '../App.css';
import Loader from './Loader.js';
import Alert from './Alert.js';

import PropTypes from 'prop-types';

export class HomePage extends Component {
  static propTypes = {
    campaigns: PropTypes.array,
    errorMessage: PropTypes.string,
    fetching: PropTypes.bool,
    getCampaigns: PropTypes.func,
    readCampaign: PropTypes.func,
    campaign: PropTypes.shape({
      facts: PropTypes.object,
      title: PropTypes.string,
      cover_image: PropTypes.object
    })
  }

  static defaultProps = {
    getCampaigns: () => {},
    readCampaign: () => {},
    errorMessage: '',
    fetching: false,
    campaign: {
      facts: {
        problem: ''
      },
      title: '',
      cover_image: {
        default: '',
        sizes: {
          landscape: {
            uri: ''
          }
        }
      }
    }
  }

  constructor(props) {
    super(props);
    this.joinDiscussion = this.joinDiscussion.bind(this);
  }

  componentDidMount() {
    this.props.getCampaigns();
  }

  joinDiscussion(campaign) {
    const campaignId =  campaign.id;
    this.props.readCampaign(campaignId, this.props);
  }

  displayCampaigns() {
    const { campaigns, fetching } = this.props;

    if (fetching) return <Loader />;

    return campaigns.map((campaign, i) => {
      let coverImage = campaign.cover_image.default;
      coverImage = (coverImage && coverImage.sizes.landscape.uri) || 'https://picsum.photos/g/348/196';
      
      return (
        <div className="col-md-4" key={i} >
          <div className="card mb-4 shadow-sm">
            <img alt="" src={coverImage} className="campaignImage" />
            <div className="card-body">
              <p className="card-text">{campaign.title}</p>
              <p className="card-text tagLine">{campaign.facts.problem}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <input type="button" className="btn btn-sm btn-outline-secondary" value="Join Discussion" onClick={()=>this.joinDiscussion(campaign)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="container">
        <Alert errorMessage={this.props.errorMessage} />
        <div className="row">
          { this.displayCampaigns() }
        </div>
      </div>
    );
  }
}

export default HomePage;
