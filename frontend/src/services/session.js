// export default {
//   start: (meetingData) => {
//     console.log(meetingData, 'meetingdata')
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(meetingData)
//     };
  
//     return fetch('/meetings/meetingUrl', requestOptions)
//       .then(handleResponse)
//       .then(function(data) {
//         return data;
//       });
//   }
// } 

// function handleResponse(response) {
//   if (!response.ok) {
//     return Promise.reject(response.statusText);
//   }

//   return response.json();
// }

// import _ from "lodash";
// // import {
// //   alertEventMessage,
// //   publishUserJoinedSuccess,
// //   disconnectOpenTokSuccess,
// //   populateVideoInputDevice,
// //   populateAudioInputDevice,
// //   setDefaultVideoInput,
// //   setDefaultAudioInput,
// //   publishVolumeChange,
// //   remoteUserDisconnected
// // } from "../actions/openTokVideo";

// // import { showSuccessMessage, resetNoticeMessages } from "../actions/alert";
// let session = {};

// export default {
//   apiKey: null,
//   sessionId: null,
//   token: null,
//   remoteParticipantChangeDevice: false,
//   devicesFetched: false,
//   currentUserId: null,
//   appointmentId: null,

//   init(dispatch) {
//     this.apiKey = '46306882';
//     this.sessionId = '07c5ced602bd1dd0bbccd2c9b483de6a8ef01f7b';
//     this.token = 'T1==cGFydG5lcl9pZD00NjMwNjg4MiZzaWc9NWFiZDBhMGMzZmU4ZTMyZjAxNzhkMzcxNjBkZjc1NjdlZDA3NDEwYTpzZXNzaW9uX2lkPTJfTVg0ME5qTXdOamc0TW41LU1UVTFOVEF5TXpVNU9UTTJPSDV0YTB4RlN6QnRaaXRxZFVKNlYzQXZNRUZGYzNJMVNuUi1mZyZjcmVhdGVfdGltZT0xNTU1MDIzNzI1Jm5vbmNlPTAuOTkwNTA3ODU0MzU2MDY1MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU1MDI3MzI0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

//     session = window.OT.initSession(this.apiKey, this.sessionId);
//     this.initListeners(dispatch);
//   },

//   connect(dispatch) {
//     console.log("Establishing a connection to the OpenTok Server");
//     return new Promise((resolve, reject) => {
//       const publisher = this.getPublisher(null, dispatch);
//       if(session.isConnected && session.isConnected()) {
//         return this.publishSession(publisher, resolve, reject, dispatch);
//       }

//       session.connect && session.connect(this.token, (err) => {
//         if(err) {
//           switch (err.name) {
//             case "OT_NOT_CONNECTED":
//               // dispatch(alertEventMessage("You have to be connected before you can do that. Try again once your connection is established."));
//               break;
//             default:
//               console.log("An unknown error occurred connecting");
//               // dispatch(alertEventMessage("An unknown error occurred connecting. Please refresh the page and try again."));
//           }
//           reject();
//         } else {
//           console.log("Connected");
//           this.publishSession(publisher, resolve, reject, dispatch);
//         }
//       });
//     });
//   },

//   publishSession(publisher, resolve, reject, dispatch) {
//     publisher.on({
//       streamCreated: (e) => {
//         resolve();
//       },
//       streamDestroyed: (e) => {
//         // prevent publisher object from being destroyed and local video element from being removed
//         e.preventDefault();
//         // dispatch(disconnectOpenTokSuccess());
//       }
//     });

//     session.publish(publisher, function(err) {
//       if (err) {
//         switch (err.name) {
//           case "OT_NOT_CONNECTED":
//             // dispatch(alertEventMessage("Publishing your video failed. You are not connected to the internet."));
//             break;
//           case "OT_CHROME_MICROPHONE_ACQUISITION_ERROR":
//             // dispatch(alertEventMessage("The browser failed to get access to your microphone. Please restart chrome and reload the page."));
//             break;
//           case "OT_HARDWARE_UNAVAILABLE":
//           case "OT_NO_DEVICES_FOUND":
//             // dispatch(alertEventMessage("The browser cannot access your camera and mic. You may need to fully quit and restart your browser to get it to work."));
//             break;
//           case "OT_MEDIA_ERR_NETWORK":
//             // dispatch(alertEventMessage("I'm having trouble connecting you. Could you please refresh the page and try again."));
//             break;
//           case "OT_CREATE_PEER_CONNECTION_FAILED":
//             // dispatch(alertEventMessage("Publishing your video failed. This could be due to a restrictive firewall."));
//             break;
//           default:
//             // dispatch(alertEventMessage("An unknown error occurred while trying to publish your video. Please refresh the page and try again."));
//         }
//         reject();
//       } else {
//         console.log("Session is now published");
//       }

//     });
//   },


//   clearVideoContainer(containerId) {
//     let container = document.getElementById(containerId);
//     if (container.innerHTML !== '') {
//       container.innerHTML = '';
//     }
//   },

//   initListeners(dispatch) {
//     console.log('intializing', session)
//     session.on({
//       connectionCreated: (e) => {
//         console.log('ruruu')
//         if (e.connection.connectionId != session.connection.connectionId) {
//           console.log('connection creaated')
//           // dispatch(publishUserJoinedSuccess());
//         }
//       },

//       streamCreated: (e) => {
//         const options = {
//           width: "100%",
//           height: "100%",
//           subscribeToAudio: true,
//           subscribeToVideo: true,
//           insertMode: "append",
//           audioVolume: 10
//         };

//         this.clearVideoContainer("remoteVideoPreview");
//         const subscriber = session.subscribe(e.stream, "remoteVideoPreview", options);
//         this.subscriber = subscriber;
//         this.onVolumeSlide(100, dispatch);

//         this.subscriber.on({
//           videoDisabled: (e) => {
//             if (e.reason === "quality") {
//               // dispatch(alertEventMessage("Your network quality is unstable due to poor bandwidth or congestion. I'm switching you to audio-only until your connection gets better."));
//             }
//           },
//           videoEnabled: (e) => {
//             // dispatch(showSuccessMessage("Your network quality is better. video has been enabled"));
//           }
//         })
//       },

//       // streamDestroyed: (e) => {
//       //   if (!this.remoteParticipantChangeDevice) {
//       //     const message = "Participant has disconnected from the call";
//       //     //dispatch an action that sets the remoteUserJoined property to false
//       //     dispatch(remoteUserDisconnected());
//       //     dispatch(exitFullScreen());
//       //     dispatch(alertEventMessage(message));
//       //   }
//       //   this.remoteParticipantChangeDevice = false;
//       // },

//       // sessionDisconnected: (e) => {
//       //   if (e.reason == "networkDisconnected") {
//       //     dispatch(alertEventMessage('Connection terminated due to internet connection issues'));
//       //   }

//       //   if (e.reason == "networkTimedout") {
//       //     dispatch(alertEventMessage('Connection terminated due to internet connection issues'));
//       //   }

//       //   dispatch(disconnectOpenTokSuccess());
//       // }
//     });
//   },

// //   destroyPublisher() {
// //     // this stops the publishing of audio and video
// //     this.publisher && this.publisher.destroy();
// //     this.publisher = null;
// //   },

// //   disconnect() {
// //     session.disconnect && session.disconnect();
// //   },

// //   disconnectSession() {
// //     session.disconnect && session.disconnect();
// //     this.destroyPublisher();
// //   }
// };
