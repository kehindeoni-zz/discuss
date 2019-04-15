import React, { Component } from 'react';
import '../App.css';
import Loader from './Loader.js';
import Alert from './Alert.js';

import PropTypes from 'prop-types';
export class CampaignChatPage extends Component {
  static propTypes = {
    endVideoChat: PropTypes.func,
    readCampaign: PropTypes.func,
    startVideoChat: PropTypes.func,
    errorMessage: PropTypes.string,
    fetching: PropTypes.bool,
    joinedVideoChat: PropTypes.bool,
    subscribers: PropTypes.array,
    campaign: PropTypes.shape({
      facts: PropTypes.object,
      title: PropTypes.string,
      solutions: PropTypes.object
    })
  }

  static defaultProps = {
    endVideoChat: () => {},
    readCampaign: () => {},
    startVideoChat: () => {},
    errorMessage: '',
    fetching: false,
    joinedVideoChat: false,
    subscribers: [],
    campaign: {
      facts: {
        problem: ''
      },
      title: '',
      solutions: {
        copy: {
          raw: ''
        }
      }
    }
  }

  constructor(props) {
    super(props);

    this.startVideoChat = this.startVideoChat.bind(this);
    this.endVideoChat = this.endVideoChat.bind(this);
  }

  componentDidMount() {
    const campaignId  =  this.props.match.params.id 
    this.props.readCampaign(campaignId);
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

  displaySolution(campaign) {
    const solution = campaign.solutions.copy.raw || campaign.facts.solution
    if (!solution) return;

    return (
      <p><strong>Solution: </strong>{solution}</p>
    );
  }

  displayProblem(campaign) {
    const problem = campaign.facts.problem;
    if (!problem) return;

    return (
      <p><strong>Problem: </strong>{problem}</p>
    );
  }

  endVideoChat() {
    this.props.endVideoChat && this.props.endVideoChat();
  }
  
  startVideoChat() {
    const campaignId = this.props.match.params.id;
    this.props.startVideoChat(campaignId);
  }

  render() {
    const { campaign, fetching, errorMessage, subscribers } = this.props;
    if (fetching || !campaign) return <Loader />;

    return (
      <div className="container">
        <Alert errorMessage={ errorMessage } />
        <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-2 px-md-2 col-md-7 text-center text-white overflow-hidden video">             
            <div className="videos">
              <div id="publisher" className="publisher"></div>
              { this.displayVideoChatButton() }
            </div>
          </div>
          <div className="bg-light mr-md-3 pt-3 px-3 pt-md-3 px-md-3 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h2 className="display-5">{campaign.title}</h2>
              { this.displayProblem(campaign) }
              { this.displaySolution(campaign) }
            </div>
          </div>
        </div>
        <div className="d-md-flex flex-md-equal w-100">
          {
            subscribers.map((id, i) => {
              return (<div id={id} key={i} className="subscriber col-md-3 mx-md-1"></div>)
            })
          }
        </div>
      </div>
    );
  }
}

export default CampaignChatPage;
