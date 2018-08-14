'use strict';

module.exports = {
  env: 'development',
  get db(){ return  'mongodb://localhost:27017/test' },
  port: process.env.PORT || 9090,
  database: "test",
  secret: "highlysecret"
};