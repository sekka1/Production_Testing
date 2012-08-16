var frisby = require('/usr/local/lib/node_modules/frisby/lib/frisby.js');

var URL = 'https://v1.api.algorithms.io';
var AUTH_TOKEN = 'c1a77f12caa5b03ee5654838f1741be0';

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{'authToken': AUTH_TOKEN}
  }
});

frisby.create('Get Recommendation')
  .post(URL + '/jobs',{
  			job_params:'{"job":{"algorithm":{"id":"14"},"input_variables":{"datasource_id_seq":"1066","type":"item","item":"PI3USB102"}}}'
  			}
  		)
  //.inspectBody();
  
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectBodyContains('output')
  .expectBodyContains('Success')
  .expectBodyContains('recommendation')
//  .inspectBody()
  .toss();
