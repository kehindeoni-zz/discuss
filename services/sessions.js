var apiKey = process.env.OPENTOK_KEY
var apiSecret = process.env.OPENTOK_SECRET
var OpenTok = require('opentok');
var db = require('./db');
var opentok = new OpenTok(apiKey, apiSecret);

module.exports = {
  apiKey: apiKey,

  createSession(sessionName) {
    return this.getSessionId(sessionName)
      .then(function(sessionId) {
        if (!sessionId) {
          return new Promise(function(resolve, reject) {
            opentok.createSession({ mediaMode: 'routed' }, function(err, session) {
              if (err) {
                reject(err);
              }

              sessionId = session.sessionId;

              db.save(sessionName + 'Session', sessionId);
              return resolve(sessionId);
            });
          });
        }
        return sessionId;
      });
  },

  getSessionId(sessionName) {
    var key = sessionName + 'Session';
    return db.find(key);
  },

  getTokenFromId(sessionId) {
    return opentok.generateToken(sessionId);
  }
}
