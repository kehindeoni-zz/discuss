var superagent = require('superagent');
var utils = require('../utils');
var baseUrl = 'https://www.dosomething.org/api/v1';

module.exports = {
  get(path, params={}) {
    var link = utils.buildParams(baseUrl + path, params);
    return superagent
      .get(link)
      .set('Content-Type', 'application/json')
      .then(res => res.body);
  },

  post(path, data) {
    return superagent
      .post(path)
      .set('Content-Type', 'application/json')
      .send(data)
      .then(res => res.body);
  }
}
