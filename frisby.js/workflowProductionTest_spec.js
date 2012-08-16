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
* Get the status of a completed workflow
*/
frisby.create('Get Workflow Status')
  .get(URL + '/workflow/id/0b9d5bfd19e2d192805243d6bf8e5517')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/html')
  .expectBodyContains('0b9d5bfd19e2d192805243d6bf8e5517')
  .expectBodyContains('11R2RYxQ24wOwHmpHSc2xOF5LJEEqqQxZGB3xSP8d0DGk')
//  .inspectBody()
  .toss();
