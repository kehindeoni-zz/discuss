import React, { Component } from 'react';
import '../App.css';
import Loader from './Loader.js';

export class CampaignChatPage extends Component {
  constructor(props) {
    super(props);

    this.startVideoChat = this.startVideoChat.bind(this);
  }

  componentDidMount() {
    const campaignId  =  this.props.match.params.id 
    this.props.readCampaign(campaignId)
  }

  startVideoChat() {
    const campaignId  =  this.props.match.params.id 
    this.props.startVideoChat(campaignId);
  }

  componentWillUnmount() {
    this.props.endVideoChat();
  }

  componentWillReceiveProps() {
    console.log(this.props, 'updated props')
  }
  render() {
    const { campaign, fetching } = this.props;
    if (fetching || !campaign) return <Loader />;

    return (
      <div className="container">
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-2 px-md-2 col-md-7 text-center text-white overflow-hidden">             
            <div className="videos">
              <div id="publisher" className="publisher"></div>
              <button type="button" className="btn btn-success startButton" onClick={this.startVideoChat}>Click to Join Video Chat</button>
            </div>
          </div>
          <div className="bg-light mr-md-3 pt-3 px-3 pt-md-3 px-md-3 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">{campaign.title}</h2>
              <p className="lead"><strong>Problem:</strong> {campaign.facts.problem}</p>
              <p className="lead"><strong>Solution:</strong> {campaign.solutions.copy.raw}</p>
            </div>
          </div>
        </div>
        <div className="d-md-flex flex-md-equal w-100">
          {
            this.props.subscribers.map((id, i) => {
              return (<div id={id} key={i} className="subscriber col-md-3 mx-md-1"></div>)
            })
          }
        </div>
      </div>
    );
  }
}

export default CampaignChatPage;

