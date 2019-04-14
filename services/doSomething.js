var http = require('./http');

module.exports = {
  findCampaigns(query) {
    return http.get('/campaigns', query);
  },

  findCampaign(id) {
    return http.get('/campaigns/' + id);
  }
}
