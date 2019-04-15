import React, { Component } from 'react';
import '../App.css';
import Loader from './Loader.js';

export class CampaignChatPage extends Component {
  constructor(props) {
    super(props);

    this.startVideoChat = this.startVideoChat.bind(this);
    this.endVideoChat = this.endVideoChat.bind(this);
  }

  componentDidMount() {
    const campaignId  =  this.props.match.params.id 
    this.props.readCampaign(campaignId)
  }

  componentWillUnmount() {
    this.endVideoChat();
  }

  displayVideoChatButton() {
    if(this.props.joinedVideoChat) {
      return (<button type="button" className="btn btn-danger videoButton" onClick={this.endVideoChat}>Leave Video Chat</button>);
    }

    return (<button type="button" className="btn btn-success videoButton" onClick={this.startVideoChat}>Click to Join Video Chat</button>);
  }

  endVideoChat() {
    this.props.endVideoChat && this.props.endVideoChat();
  }
  
  startVideoChat() {
    const campaignId  =  this.props.match.params.id 
    this.props.startVideoChat(campaignId);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if(!errorMessage) return;

    return (
      <div className="alert alert-danger" role="alert">
        { errorMessage }
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }

  render() {
    const { campaign, fetching } = this.props;
    if (fetching || !campaign) return <Loader />;

    return (
      <div className="container">
        { this.renderErrorMessage() }
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-2 px-md-2 col-md-7 text-center text-white overflow-hidden">             
            <div className="videos">
              <div id="publisher" className="publisher"></div>
              { this.displayVideoChatButton() }
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

