'use strict';

const fetchRequest = require('request');

module.exports.redirect = (request, reply) => {
  fetchRequest(`http://localhost:3000/redirect/${request.params.hash}`, function (error, response, uri) {
    if (!error && response.statusCode == 200) {
      reply.redirect(uri).code(301);
    } else {
      reply.redirect("http://lfum.es").code(301);
    }
  })
}