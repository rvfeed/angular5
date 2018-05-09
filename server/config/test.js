'use strict';

module.exports = {
  env: 'test',
    get db(){ return  'mongodb://localhost:27017/test' },
  port: process.env.PORT || 9091,
  database: "test"
};