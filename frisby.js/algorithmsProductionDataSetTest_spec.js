var frisby = require('/usr/local/lib/node_modules/frisby/lib/frisby.js');

var URL = 'https://v1.api.algorithms.io';
var AUTH_TOKEN = 'c1a77f12caa5b03ee5654838f1741be0';
var DATASET_ID = 2033;

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{'authToken': AUTH_TOKEN}
  }
});

frisby.create('Dataset GET')
  .get(URL + '/dataset')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(
  		{
  			"api":{"Authentication": String},
  		 	"data": Array
  		}
  )
  .toss();


frisby.create('Dataset GET ID')
  .get(URL + '/dataset/id/' + DATASET_ID)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/html')
  .expectBodyContains('data')
  .toss();