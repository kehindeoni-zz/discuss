var session = require('../services/sessions');

module.exports = {
  getRoom(req, res, next) {
    var roomName = req.params.roomName || 'lounge';

    session.createSession(roomName)
    .then(function(sessionId) {
        console.log(roomName, 'roomName');
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
