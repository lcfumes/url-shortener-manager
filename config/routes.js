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
    path: '/js/{all*}',
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
    path: '/favicon.ico',
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
    path: '/sitemap.xml',
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
    path: '/{hash}',
    handler: UrlController.redirect 
  }
];