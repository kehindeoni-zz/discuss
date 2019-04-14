import React, { Component } from 'react';
import '../App.css';
import Loader from './Loader.js';

export class CampaignChatPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const campaignId  =  this.props.match.params.id 
    this.props.readCampaign(campaignId)
  }

  render() {
    const { campaign, fetching } = this.props;
    if (fetching || !campaign) return <Loader />;

    return (
      <div className="container">
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">              
            <iframe
              src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=8d5b1945-9bb5-4381-a4ad-81541ec97234&room=${campaign.id}&iframe=true`}
              width="100%"
              height="300px"
              allow="microphone; camera"
              title='video chat'
            ></iframe>
    
          </div>
          <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">{campaign.title}</h2>
              <p className="lead">Problem: {campaign.facts.problem}</p>
              <p className="lead">Solution: {campaign.solutions.copy.raw}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CampaignChatPage;

