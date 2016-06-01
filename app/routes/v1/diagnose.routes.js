'use strict';

module.exports = function(router) {
	var diagnose = require('../../controllers/diagnose.controller');
	
	// test route to make sure everything is working (at GET http://localhost:3000/api/v1)
	router.get('/diagnose', diagnose.diagnosis);
};