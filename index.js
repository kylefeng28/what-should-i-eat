const express = require('express');
const bodyParser = require('body-parser');
const yelp = require('yelp-fusion');

// Load dotenv
require('dotenv').config();

const port = process.env.PORT || 8081;

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const yelpClient = require('./yelpClient');

const router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });   
});

yelpClient.search({
	term:'Four Barrel Coffee',
	location: 'san francisco, ca'
}).then(response => {
	console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
	console.log(e);
});

yelpClient.autocomplete({
	text:'pizza'
}).then(response => {
	console.log(response.jsonBody.terms[0].text);
}).catch(e => {
	console.log(e);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

