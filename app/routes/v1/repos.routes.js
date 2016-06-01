'use strict';

module.exports = function (router) {
	var repo = require('../../controllers/repos.controller');

	// repo Routes
	router.route('/repos/:username')
		.get(repo.list);
};