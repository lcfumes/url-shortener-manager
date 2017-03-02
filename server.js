'use strict';

const Hapi = require('hapi');
const fetchRequest = require('request');

const server = new Hapi.Server();
server.connection({ 
    port: 3300,
    routes: { 
        cors: true 
    } 
});

server.register({
    register: require('h2o2')
}, err => {
    if (err) {
        console.log(err);
    } else {

        server.route({
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
        });

        server.route({
          method: '*',
          path: '/js/{all}',
          handler: {
            proxy: {
              uri: 'http://localhost:3030/js/{all}'
            }
          }
        });

        server.route({
          method: '*',
          path: '/favicon.ico',
          handler: {
            proxy: {
              uri: 'http://localhost:3030/favicon.ico'
            }
          }
        });

        server.route({
          method: '*',
          path: '/{hash}',
          handler: function(request, reply) {
            fetchRequest(`http://localhost:3000/redirect/${request.params.hash}`, function (error, response, uri) {
              if (!error && response.statusCode == 200) {
                reply.redirect(uri).code(301);
              } else {
                console.error(response.statusCode)
              }
            })
          }
        });


        server.start(() => {
            console.log(`Server running at: ${server.info.uri}`);
        })
    }
})