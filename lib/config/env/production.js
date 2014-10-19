'use strict';

module.exports = {
  env: 'production',
  url: 'http://lifterly.com',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/fullstack'
  }
};	