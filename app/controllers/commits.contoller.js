'use strict';

/**
 * Module dependencies.
 */
var Commit = require('../models/commit');
var Github = require('../helpers/github.helpers');

/**
 * Create all Commits
 */
exports.saveCommits = function(req, res) {
  Github.saveCommits(req, res)
		.then(function(message){
			res.send(message);
		})
		.fail(function(error){
			res.send(error);
		});
};

/**
 * List of Commits
 */
exports.list = function(req, res) {
  Commit.find(function(err, commits) {
    if (err)
      res.send(err);

    res.json(commits);
  });
};

/**
 * List of a commit
 */
exports.getCommit = function(req, res) {
	Commit.findOne({ 'sha': req.params.id }, function (err, commit) {
		if (err) return console.log(err);
		res.json(commit);
	})
};

/**
 * Delete of a commit
 */
exports.deleteCommit = function(req, res) {
	Commit.remove({ sha: req.params.id }, function (err) {
		if (err) return console.error(err);
		res.json("Deleted");
	});
};

/**
 * Update of a commit
 */
exports.putCommit = function(req, res) {
	var options = { multi: true };

	var query = { sha:  req.body.sha};
	Commit.update(query, req.body, options, function (err, commit) {
		res.json(commit);
	});
};
