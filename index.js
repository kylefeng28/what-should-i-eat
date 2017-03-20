const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Router = require('express-promise-router');

// Load dotenv
require('dotenv').config();

const port = process.env.PORT || 8080;

// Initialize app
var app = express();

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO define app.use(function (err, req, res, next) { ... }) for error handling

// Serve static files
app.use(express.static('public'));

/* Routes */
/******************************************************************************/
app.get('/', (req, res) => {
	res.render('index');
});

var apiRouter = Router();
var yelpClient = require('./yelpClient');

// The basic pattern is
// to return a promise that express-promise-router handles
// TODO use mime-types, accept, send

// Proxy to Yelp, since the browser can't do cross-origin authorization
apiRouter.proxyToYelp = function(path, command) {
	apiRouter.get(path, (req, res) => {
		// TODO filter out stuff, figure out whether to use location and longitude/latitude
		var query = req.query || req.body;

		return yelpClient[command](query).then(response => {
			res.json(response.data);
		});
	});
};

// Search
apiRouter.proxyToYelp('/search', 'search');
// Phone Search
apiRouter.proxyToYelp('/phone_search', 'phoneSearch');
// Transaction Search
apiRouter.proxyToYelp('/transaction_search', 'transactionSearch');
// Business
apiRouter.proxyToYelp('/business', 'business');
// Autocomplete
apiRouter.proxyToYelp('/autocomplete', 'autocomplete');

// Register API router
app.use('/api', apiRouter);

/******************************************************************************/
// Start server
app.listen(port);
console.log(`listening on ${port}`);

