const redis = require("redis");

module.exports = (app) => {
  const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
    password: 123456,
  });

  client.on("connect", function () {
    console.log("### redis connect");
  });
  client.on("reconnecting", function () {
    console.log("### redis reconnecting");
  });
  client.on("end", function () {
    console.log("### redis end");
  });
  client.on("error", function (error) {
    console.error("### redis error", error);
  });

  client.on("ready", function () {
    console.log("### redis ready");
    app.redis = client;
  });
};
