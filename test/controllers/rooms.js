var sinon = require('sinon');
var request = require('supertest');
var expect = require('chai').expect;
var sessionMock = require('../mocks/sessions');
var sessionService = require('../../services/sessions');
var app = require('../../app');

describe('Rooms', () => {
  before(function() {
    sinon.stub(sessionService, 'createSession').resolves(sessionMock.sessionId)
    sinon.stub(sessionService, 'getTokenFromId').returns(sessionMock.token)
  });

  after(function() {
    sessionService.createSession.restore();
    sessionService.getTokenFromId.restore();
  });

  describe('#Get', function() {
    context('success fetching', function(done) {
      it('for roomMame', function(done) {
        request(app)
          .get('/rooms/firstRoom')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err)

            var data = res.body.data;
            expect(data.apiKey).to.eql('1234');
            expect(data.roomName).to.eql('firstRoom');
            expect(data.sessionId).to.eql(sessionMock.sessionId);
            expect(data.token).to.eql(sessionMock.token);
            done();
          });
      });

      it('for no roomName', function(done) {
        request(app)
          .get('/rooms')
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err)

            var data = res.body.data;
            expect(data.apiKey).to.eql('1234');
            expect(data.roomName).to.eql('lounge');
            expect(data.sessionId).to.eql(sessionMock.sessionId);
            expect(data.token).to.eql(sessionMock.token);
            done();
          });
      });
    })
  });
});
