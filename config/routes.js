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
    path: '/{folder}/{file}.{ext}',
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
    path: '/{folder*2}/{file}.{ext}',
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
    path: '/{file}.{ext}',
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
    method: "GET",
    path: '/51CB41C126E83982F31DE4D199006F1C.txt',
    handler: (request, reply) => {
      reply('E405FA7B4193FC3599FA3023DE2CDEDE52C4C39C comodoca.com');
    }
  },
  {
    method: '*',
    path: '/{hash}',
    handler: UrlController.redirect 
  }
];
