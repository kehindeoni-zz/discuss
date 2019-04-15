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
    console.log(roomId, '==============roomid');
    return fetchApi.get(`rooms/${roomId}`);
  },
  initialize(credentials, dispatch) {
    console.log(credentials, '========credentials');
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
        console.log('hhhhhhh--======///////////////////====', err)
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
          console.log('00000000000000',error )
          // If the connection is successful, initialize a publisher and publish to the session
          if (error) {
            handleError('An error occured, please refresh and try again');
          } else {
            session.publish(self.publisher, (error) => {
              if(error) {
                switch (error.name) {
                  case "OT_NOT_CONNECTED":
                    handleError(`Can't publish your video. You are not connected to the internet`, dispatch);
                    break;
                  default:
                    handleError('An unknown error occured', dispatch);
                }
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
        handleError('An error occured while trying to join the call', dispatch)
      });
    }
  },
  initListeners(dispatch) {
    // Subscribe to a newly created stream
    var self = this;
    session.on('streamCreated', function(event) {
      console.log(event, 'hhuuuuuu');
      self.subscribeToSession(event, dispatch);
    }).on('sessionDisconnected', function(event) {
      console.log(event.reason);
      dispatch(videoCallDisconnected());
    }).on('connectionCreated', function(event) {
      console.log('uuuuuuu-========================', event);
      dispatch(hideStartButton());
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