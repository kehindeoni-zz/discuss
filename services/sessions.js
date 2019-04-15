var apiKey = process.env.OPENTOK_KEY;
var apiSecret = process.env.OPENTOK_SECRET;
var OpenTok = require('opentok');
var db = require('./db');
var opentok = new OpenTok(apiKey, apiSecret);

module.exports = {
  apiKey: apiKey,

  createSession(sessionName) {
    return this.getSessionId(sessionName)
    .then(function(sessionId) {
        console.log(sessionName, 'sessIONNAMEEE');
        if (!sessionId) {
          console.log('no sessionidddd')
          return new Promise(function(resolve, reject) {
            opentok.createSession({ mediaMode: 'routed' }, function(err, session) {
              if (err) {
                console.log('opentok error')
                reject(err);
              }

              sessionId = session.sessionId;
              console.log('session id=======', sessionId)

              db.save(sessionName + 'Session', sessionId);
              console.log('saved yeahhhhhh')
              return resolve(sessionId);
            });
          });
        }
        return sessionId;
      });
  },

  getSessionId(sessionName) {
    var key = sessionName + 'Session';
    console.log(key, 'got called')
    return db.find(key);
  },

  getTokenFromId(sessionId) {
    return opentok.generateToken(sessionId);
  }
}
