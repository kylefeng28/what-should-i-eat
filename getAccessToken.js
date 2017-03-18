const yelp = require('yelp-fusion');

// Load dotenv
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

yelp.accessToken(clientId, clientSecret).then(response => {
	console.log(response.jsonBody.access_token);
}).catch(e => {
	console.log(e);
});
