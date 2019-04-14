var apiKey = process.env.OPENTOK_KEY
var apiSecret = process.env.OPENTOK_SECRET
console.log('===============================', apiKey, process.env)
var OpenTok = require('opentok');
var db = require('./db');
var opentok = new OpenTok(apiKey, apiSecret);

module.exports = {
  createSession() {
    opentok.createSession(function(err, session) {
      if (err) return console.log(err);

      // save the sessionId
      db.save('sessionId', session.sessionId);
    });
  },
  openTokCredentials() {
    var sessionId = db.find('sessionId');
    var token = opentok.generateToken(sessionId);
    return {
      sessionId,
      token,
      apiKey
    }
  }
}
