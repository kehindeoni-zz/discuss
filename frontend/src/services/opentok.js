import { updateSubscribersList } from '../actions/opentok';
import fetchApi from './api'

let session = {};

function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

export default {
  publisher: null,
  subscribers: [],
  getRoom(roomId) {
    return fetchApi.get(`rooms/${roomId}`);
  },
  initialize: (credentials, dispatch) => {
    var apiKey = credentials.apiKey;
    var sessionId = credentials.sessionId;
    var token = credentials.token;
    session = window.OT.initSession(apiKey, sessionId);

    this.initListeners(dispatch);

    // Create a publisher
    this.publisher = this.publisher || window.OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, initialize a publisher and publish to the session
      if (error) {
        handleError(error);
      } else {
        // dispatch this
        if(session.isConnected) {
          console.log('connecteeedddd')
        }
        session.publish(this.publisher, handleError);
      }
    });
  },
  subscribeSubscriber(evt, dispatch) {
    if (evt.stream) {
      const subscriberId = `subscriber-${evt.stream.streamId}`
      this.subscribers = [...this.subscribers, subscriberId];

      dispatch(updateSubscribersList(this.subscribers));
      session.subscribe(evt.stream, subscriberId, {
        insertMode: 'replace',
        width: '100%',
        height: '100%'
      }, handleError);
    }
  },
  initListeners(dispatch) {
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
      this.subscribeSubscriber(event, dispatch);
    }).on('sessionDisconnected', function(event) {
      console.log('this this this')
    }).on('connectionCreated', function(event) {
      console.log(event, 'lets seee')
    });
  },
  disconnectOpentok() {
    console.log('get called')
    session.disconnect && session.disconnect();
    this.destroyPublisher();
    console.log('disconnectedddd')
  },
  disconnectPublisher() {
    // this stops the publishing of audio and video
    this.publisher && this.publisher.destroy();
    this.publisher = null;
  }
}