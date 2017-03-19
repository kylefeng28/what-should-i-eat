const yelp = require('yelp-fusion');

// Load dotenv
require('dotenv').config();

const accessToken = process.env.ACCESS_TOKEN;
const yelpClient = yelp.client(accessToken);

module.exports = yelpClient;
