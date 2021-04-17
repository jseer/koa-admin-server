const SESSION_CONFIG = {
  key: "koa.sess" /** (string) cookie key (default is koa.sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  httpOnly: true /** (boolean) httpOnly or not (default true) */,
  rolling: true /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
  // secure: true /** (boolean) secure cookie*/,
};
const REDIS_CONFIG = {
  host: "127.0.0.1",
  port: 6379,
  password: "123456",
};
const MONGODB_CONFIG = {
  user: "root",
  pass: "123456",
  dbName: "test",
  autoReconnect: true,
};
module.exports = {
  SESSION_CONFIG,
  REDIS_CONFIG,
  MONGODB_CONFIG,
};
