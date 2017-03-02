'use strict';

const Hapi = require('hapi');
const routes = require('./config/routes.js');

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

      server.route(routes);

      server.start(() => {
          console.log(`Server running at: ${server.info.uri}`);
      })
    }
})