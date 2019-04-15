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
      get(key, cb) {
        if (!this.mem[key]) { 
          return cb('Key not found', null)
        }

        return cb(null, this.mem[key]);
      }
    };
  }
});

var db = {
  save(key, data) {
    client.set(key, data);
    client.print()
  },

  find(key) {
    return new Promise(function(resolve, reject) {
      client.get(key, function(err, value) {
        resolve(value);
      });
    })
  }
}

module.exports = db;
