'use strict';

// index page 
exports.index =  function(req, res) {
	
	var drinks = [
		{ name: 'Bloody Mary', drunkness: 3 },
		{ name: 'Martini', drunkness: 5 },
		{ name: 'Scotch', drunkness: 10 }
	];
	var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
	
	// First parameter path to the ejs file
	res.render('index', {
		drinks: drinks,
		tagline: tagline
	});
}; 
