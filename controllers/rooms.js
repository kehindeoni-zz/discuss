var session = require('../services/sessions');

module.exports = {
  getRoom(req, res, next) {
    var roomName = req.params.roomName || 'lounge';

    session.createSession(roomName)
      console.log(roomName, 'roomName')
      .then(function(sessionId) {
        if (!sessionId) {
          console.log('no session id')
          return res.sendStatus(400);
        }

        var token = session.getTokenFromId(sessionId);
        console.log(token, 'yaay toke', session.apiKey, roomName, sessionId, token, '=================')
        res.send({
          data: {
            apiKey: session.apiKey,
            roomName: roomName,
            sessionId: sessionId,
            token: token
          }
        })
      })
      .catch(function(err) {
        console.log('may ber errr', err)
        next(err);
      });
  },
}
