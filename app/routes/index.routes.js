'use strict';

module.exports = function(router) {
	var index = require('../controllers/index.controller');

	// Route using the controller for logic as a callback
	router.get('/', index.index);
};