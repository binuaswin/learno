require('dotenv').config();
const { cleanEnv, str, port, url } = require('envalid');

const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGO_URI: url({ default: 'mongodb://127.0.0.1:27017/learno_db' }),
  JWT_SECRET: str(),
  CORS_ORIGINS: str({ default: 'http://localhost:3000' }),
});

module.exports = env;