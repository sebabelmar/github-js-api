var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommitSchema = new Schema({
	sha: String,
	url: String,
	message: String,
	comment_count: Number,
	author: {
		name: String,
		email: String,
		date: String
	},
	committer: {
		name: String,
		email: String,
		date: String
	},
	tree: {
		sha: String,
		url: String
	}
});

// Instead of commit write your own collection name
var myOwnCollectionName = 'Commit';
module.exports = mongoose.model(myOwnCollectionName, CommitSchema);