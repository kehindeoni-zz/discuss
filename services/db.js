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
    console.log('saving key', key)
    client.set(key, data);
  },

  find(key) {
    console.log('finding key')
    return new Promise(function(resolve, reject) {
      client.get(key, function(err, value) {
        console.log('found or nah', err, value)
        if (err) return reject(err);
        resolve(value);
      });
    })
  }
}

module.exports = db;
