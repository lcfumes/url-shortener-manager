'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ 
    port: 3300,
    routes: { 
        cors: true 
    } 
});

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }]
    }
};

server.register({
    register: require('good'),
    options: options
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
          path: '/{path*}',
          handler: {
            proxy: {
              host: 'localhost',
              port: 3000,
              protocol: 'http',
              passThrough: true,
              redirects: 5
            }
          }
        });
        server.start(() => {
            console.log(`Server running at: ${server.info.uri}`);
        })
    }
})