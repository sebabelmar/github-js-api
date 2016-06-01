'use strict';
var Github = require('../helpers/github.helpers');

/**
 * List of Repos
 */
exports.list = function(req, res) {
	Github.listRepos(req, res)
		.then(function(repos){
			res.send(repos);
		})
		.fail(function(error){
			res.send(error);
		});
};