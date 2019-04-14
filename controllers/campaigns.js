var doSomething = require('../services/doSomething');

module.exports = {
  get(req, res, next) {
    doSomething.findCampaigns(req.query)
      .then(function(response) {
        res.send({
          data: response
        })
      })
      .catch(function(err) {
        next(err);
      });
  },

  getOne(req, res, next) {
    doSomething.findCampaign(req.params.campaignId)
      .then(function(response) {
        res.send({
          data: response
        })
      })
      .catch(function(err) {
        next(err);
      });
  }
}
