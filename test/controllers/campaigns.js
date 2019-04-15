var sinon = require('sinon');
var request = require('supertest');
var expect = require('chai').expect;
var campaignMock = require('../mocks/campaigns');
var campaignService = require('../../services/doSomething');
var app = require('../../app');

describe('Campaign', () => {
  before(function() {
    sinon.stub(campaignService, 'findCampaigns').resolves([campaignMock])
    sinon.stub(campaignService, 'findCampaign').withArgs('1').resolves(campaignMock)
  });

  after(function(done) {
    campaignService.findCampaigns.restore();
    campaignService.findCampaign.restore();
    done();
  });

  describe('#Get', function() {
    it('gets all campaigns', function(done) {
      request(app)
        .get('/api/campaigns')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body).to.eql({ data: [campaignMock] });
          done()
        })

    });

    it('gets a single campaign', function(done) {
      request(app)
        .get('/api/campaigns/1')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body).to.eql({ data: campaignMock });
          done()
        })
    });
  });
});
