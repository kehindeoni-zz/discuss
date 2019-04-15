var session = require('../services/sessions');

module.exports = {
  getRoom(req, res, next) {
    var roomName = req.params.roomName || 'lounge';

    session.createSession(roomName)
    .then(function(sessionId) {
        if (!sessionId) {
          return res.sendStatus(400);
        }

        var token = session.getTokenFromId(sessionId);

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
        next(err);
      });
  },
}
