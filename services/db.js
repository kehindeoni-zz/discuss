var redis = require("redis");
var client = redis.createClient();

module.exports = {
  save(key, data) {
    client.set(key, JSON.stringify(data));
  },

  find(key) {
    return JSON.parse(client.get(key));
  }
}
