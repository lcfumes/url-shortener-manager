const UrlController = require('../controllers/UrlsController.js');

module.exports = [
  {
    method: '*',
    path: '/',
    handler: {
      proxy: {
        host: 'localhost',
        port: 3030,
        protocol: 'http',
        passThrough: true,
        redirects: 5
      }
    }
  },
  {
    method: '*',
    path: '/js/{all}',
    handler: {
      proxy: {
        uri: 'http://localhost:3030/js/{all}'
      }
    }
  },
  {
    method: '*',
    path: '/favicon.ico',
    handler: {
      proxy: {
        uri: 'http://localhost:3030/favicon.ico'
      }
    }
  },
  {
    method: '*',
    path: '/{hash}',
    handler: UrlController.redirect 
  }
];