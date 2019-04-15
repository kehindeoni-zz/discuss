import { updateSubscribersList, hideStartButton, videoCallDisconnected } from '../actions/opentok';
import { alertErrorMessage } from '../actions/alert';
import fetchApi from './api';

let session = {};

function handleError(errorMessage, dispatch) {
  dispatch(alertErrorMessage(errorMessage));
}

export default {
  publisher: null,
  subscribers: [],
  getRoom(roomId) {
    return fetchApi.get(`rooms/${roomId}`);
  },
  initialize(credentials, dispatch) {
    var apiKey = credentials.apiKey;
    var sessionId = credentials.sessionId;
    var token = credentials.token;
    session = window.OT.initSession(apiKey, sessionId);
    var self = this;

    this.initListeners(dispatch);

    // Create a publisher
    this.publisher = this.publisher || window.OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, (err) => {
      if(err) {
        switch (err.name) {
          case "OT_NOT_CONNECTED":
            handleError(`Can't publish your video. You are not connected to the internet`, dispatch);
            break;
          case "OT_USER_MEDIA_ACCESS_DENIED":
          case "OT_NO_DEVICES_FOUND":
            handleError('Error: No devices found. Please grant access to device and refresh the page', dispatch)
            break;
          default:
            handleError('An unknown error occured', dispatch);
        }
        self.destroyPublisher();
      } else {
        // Connect to the session
        session.connect(token, function(error) {
          // If the connection is successful, initialize a publisher and publish to the session
          if (error) {
            handleError('An error occured, please refresh and try again');
          } else {
            session.publish(self.publisher, (error) => {
              if(error) {
                switch (error.name) {
                  case "OT_NOT_CONNECTED":
                    return handleError(`Can't publish your video. You are not connected to the internet`, dispatch);
                  default:
                    return handleError('An unknown error occured', dispatch);
                }
              } else {
                dispatch(hideStartButton());
              }
            });
          }
        });
      }
    });
  },
  subscribeToSession(evt, dispatch) {
    if (evt.stream) {
      const subscriberId = `subscriber-${evt.stream.streamId}`
      this.subscribers = [...this.subscribers, subscriberId];

      dispatch(updateSubscribersList(this.subscribers));
      session.subscribe(evt.stream, subscriberId, {
        insertMode: 'replace',
        width: '100%',
        height: '100%'
      }, (err) => {
        if (err) {
          handleError('An error occured while trying to join the call', dispatch)
        }
      });
    }
  },
  initListeners(dispatch) {
    // Subscribe to a newly created stream
    var self = this;
    session.on('streamCreated', function(event) {
      self.subscribeToSession(event, dispatch);
    }).on('sessionDisconnected', function(event) {
      console.log(event.reason);
      dispatch(videoCallDisconnected());
    }).on('connectionCreated', function(event) {
      console.log('Connection created');
    });
  },
  disconnectOpentok(dispatch) {
    session.disconnect && session.disconnect();
    this.destroyPublisher();
  },
  destroyPublisher() {
    // this stops the publishing of audio and video
    this.publisher && this.publisher.destroy();
    this.publisher = null;
  }
}