var doSomethingService = require('../services/doSomething');
var OpentokService = require('../services/openTok');

module.exports = {
  get(req, res, next) {
    openTokCredentials = OpentokService.getCredentials();
    console.log(openTokCredentials, 'opentokcresdeekke');
    doSomethingService.findCampaigns(req.query)
      .then(function(response) {
        res.send({
          data: response
        })
      })
      .catch(function(err) {
        res.sendStatus(500)
      });
  },

  getOne(req, res, next) {
    doSomething.findCampaign(req.params.campaignId)
      .then(function(response) {
        console.log(response, 'or here')
        res.send({
          data: response
        })
      })
      .catch(function(err) {
        console.log(err,'badjjd')
        res.sendStatus(500)
      });
  }
}
