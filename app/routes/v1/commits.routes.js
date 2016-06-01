'use strict';

module.exports = function (router) {
  var commit = require('../../controllers/commits.contoller.js');

  // commit Routes
  router.route('/commits')
	  .get(commit.list);
	
	router.route('/commits/:id')
    .get(commit.getCommit)
    .delete(commit.deleteCommit)
    .put(commit.putCommit);

	router.route('/savecommits/:reponame')
		.post(commit.saveCommits)
};
