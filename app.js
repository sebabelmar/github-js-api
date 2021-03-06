// BASE SETUP
// =============================================================================

// load the packages we are going to use
var express         		= require('express');        // call express
var app             		= express();                 // define our app using express
var bodyParser      		= require('body-parser');
var mongoose        		= require('mongoose');
var diagnoseRoutes  		= require('./app/routes/v1/diagnose.routes');
var reposRoutes  		    = require('./app/routes/v1/repos.routes');
var commitsRoutes 	    = require('./app/routes/v1/commits.routes');

// mongo shell connection: $ mongo ds061365.mlab.com:61365/dbc_node_api -u dbc_student -p dbcmean
// conecting to MongoLab via mongo url
mongoose.connect('mongodb://dbc_student:dbcmean@ds061365.mlab.com:61365/dbc_node_api');

var port = process.env.PORT || 3000;        // set our port

// in order to process data from POST requests
// configure 'app' to use the package bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router docs: http://expressjs.com/en/guide/routing.html

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('We can log data out :D');
    next(); // make sure we go to the next routes and don't stop here
});


// REGISTER OUR ROUTES
diagnoseRoutes(router);
reposRoutes(router);
commitsRoutes(router);

// all of our routes will be prefixed with /api/version 
// we are thinking that your application shares the same domain as your public api
app.use('/api/v1', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port: ' + port);
