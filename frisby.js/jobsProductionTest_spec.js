var frisby = require('/usr/local/lib/node_modules/frisby/lib/frisby.js');

var URL = 'https://v1.api.algorithms.io';
var AUTH_TOKEN = 'c1a77f12caa5b03ee5654838f1741be0';

// Global setup for all tests
frisby.globalSetup({
  request: {
    headers:{'authToken': AUTH_TOKEN}
  }
});

/*
* Prepping the file for a recommendation
*/
frisby.create('Prep File')
  .timeout(60000)
  .post(URL + '/jobs',{
  			job_params:'{"job":{"algorithm":{"id":"13"},"input_variables":{"datasource_id_seq":"2034","field_user_id":"user","field_item_id": "item","field_preference":"pref"}}}'
  			}
  		)
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectBodyContains('output')
  .expectBodyContains('Success')
  .expectBodyContains('field_map_id')
  .expectBodyContains('outcome')
  .expectBodyContains('14696')
//  .inspectBody()
  .toss();
  
/*
* Get a recommendation
*/
frisby.create('Get Recommendation')
  .post(URL + '/jobs',{
  			job_params:'{"job":{"algorithm":{"id":"14"},"input_variables":{"datasource_id_seq":"2034","type":"item","item":"Terminator The 1984"}}}'
  			}
  		)
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectBodyContains('output')
  .expectBodyContains('Success')
  .expectBodyContains('recommendation')
//  .inspectBody()
  .toss();

/*
* Get Status on a pre-existing Map Reduce Job
*/
frisby.create('Get MR Status')
  .post(URL + '/jobs',{
  			job_params:'{"job":{"algorithm":{"id":"23","params":{"job_id":"82043492c17e5773ddcc2275127f3762"} },"action":"get_status"}}'
  			}
  		)
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectBodyContains('status')
  .expectBodyContains('final')
  .expectBodyContains('COMPLETED')
//  .inspectBody()
  .toss();