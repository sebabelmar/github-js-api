/**
 * Module dependencies.
 */
var request = require('request');
var Commit  = require('../models/commit');
var env     = require('node-env-file');
var Q       = require('q');
// env('.env');

/**
 * Module constants.
 */
var USERNAME    = '';
var CLIENT_ID   = '';
var SECRET      = '';

// var USERNAME    = process.env.GITHUB_API_USERNAME;
// var CLIENT_ID   = process.env.GITHUB_API_CLIENT_ID;
// var SECRET      = process.env.GITHUB_API_SECRET;

var BASE_URL    = 'https://api.github.com';
var AUTH = '?client_id=' + CLIENT_ID + '&client_secret=' + SECRET;

/**
 * List of repos.
 */
exports.listRepos = function(req, res){
	var options = {
		url: BASE_URL + '/users/' + req.params.username +'/repos'+ AUTH,
		headers: {
			'User-Agent': 'request'
		}
	};
	
	var deferred = Q.defer();
	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			deferred.resolve(JSON.parse(body));
		}else{
			deferred.reject(err);
		}
	}
	
	request(options, callback);
	
	return deferred.promise
};

/**
 * Seed repos in DB.
 */
exports.saveCommits = function(req, res){
	
	function seedCommits (commitsArr) {
		commitsArr.forEach(function(githubCommit) {

			// Creates a new model instance
			var commit = new Commit(
				{
					sha: githubCommit.sha,
					url: githubCommit.commit.url,
					message: githubCommit.commit.message,
					comment_count: githubCommit.commit.comment_count,
					author: {
						name: githubCommit.commit.author.name,
						email: githubCommit.commit.author.email,
						date: githubCommit.commit.author.date
					},
					committer: {
						name: githubCommit.commit.committer.name,
						email: githubCommit.commit.committer.email,
						date: githubCommit.commit.committer.date
					},
					tree: {
						sha: githubCommit.commit.tree.sha,
						url: githubCommit.commit.tree.url
					}
				}
			);

			// save commits and check for errors
			commit.save(function(err) {
				if (err)
					console.error(err);

				console.log("Databases seeded")
			});
		});
		
		return "Commits Saved"
	}

	var options = {
	  url: BASE_URL + '/repos/' + USERNAME + '/' +req.params.reponame + '/commits?' + AUTH,
	  headers: {
	    'User-Agent': 'request'
	  }
	};

	var deferred = Q.defer();
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var info = JSON.parse(body);

		  // We use this function to seed the DB
		  deferred.resolve(seedCommits(info, res));
	  }else{
		  deferred.reject(err);
	  }
	}
	 
	request(options, callback);

	return deferred.promise;
};