'use strict';

module.exports = {
  env: 'production',
  db: 'mongodb://localhost:27017/production',
  port: process.env.PORT || 9099,
};