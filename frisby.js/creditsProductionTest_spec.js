var frisby = require('/usr/local/lib/node_modules/frisby/lib/frisby.js');

var URL = 'https://v1.api.algorithms.io';
var AUTH_TOKEN = 'c1a77f12caa5b03ee5654838f1741be0';

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{'authToken': AUTH_TOKEN}
  }
});

frisby.create('Credits GET')
  .get(URL + '/credits')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(
  		{
  			"credits_available":String 
  		}
  )
  .toss();

