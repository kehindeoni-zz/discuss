var apiKey = process.env.OPENTOK_KEY
var apiSecret = process.env.OPENTOK_SECRET
var OpenTok = require('opentok');
var db = require('./db');
var opentok = new OpenTok(apiKey, apiSecret);

module.exports = {
  apiKey: apiKey,

  createSession(sessionName) {
    var session = this;
    return new Promise(function(resolve, reject) {
      var sessionId = session.getSessionId(sessionName);

      if (!sessionId) {
        return opentok.createSession({ mediaMode: 'routed' }, function(err, session) {
          if (err) {
            reject(err);
            return console.log(err);
          }
          sessionId = session.sessionId;

          db.save(sessionName + 'Session', sessionId);
          resolve(sessionId);
        });
      }

      resolve(sessionId);
    });
  },

  getSessionId(sessionName) {
    var key = sessionName + 'Session';
    return db.find(key);
  },

  getToken(sessionName) {
    var sessionId = this.getSessionId(sessionName);
    return this.getTokenFromId(sessionId);
  },

  getTokenFromId(sessionId) {
    return opentok.generateToken(sessionId);
  }
}
