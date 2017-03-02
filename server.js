'use strict';

const Hapi = require('hapi');

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
          path: '/{hash}',
          handler: {
            proxy: {
              uri: 'http://localhost:3000/{hash}'
            }
          }
        });
        server.start(() => {
            console.log(`Server running at: ${server.info.uri}`);
        })
    }
})