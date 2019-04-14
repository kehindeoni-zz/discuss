var redis = require("redis");
var client = redis.createClient();

client.on('error', function(err) {
  if (!client.mem) {
    console.log('\n====== Redis Client Error ========\n');
    console.log('No Redis server available on 127.0.0.1:6379\n');
    console.log('Using in memory javascript object instead.');
    console.log('\n==================================\n');
    client = {
      mem: {},
      set(key, value) {
        this.mem[key] = value;
      },
      get(key) {
        return this.mem[key];
      }
    };
  }
});

var db = {
  save(key, data) {
    client.set(key, JSON.stringify(data));
  },

  find(key) {
    var value = client.get(key);
    return value && JSON.parse(value) || null;
  }
}

module.exports = db;
