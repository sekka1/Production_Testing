/*
 * This is testing the Magic Gift Bag Calls
 */

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
* Get gift recommendation
*/
frisby.create('MGB - Get gift recommendations')
  .timeout(60000)
  .post(URL + '/jobs',{
  			job_params:'{"job":{"algorithm":{"id":"28","params":{"graphPath":"/1221835242/likes","method":"GET","params":[]}},"outputType":"json","method":"sync","datasources":[2075]}}'
  			}
  		)
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectBodyContains('interests')
  .toss();

/*
 * Test getting results from Amazon
 */
frisby.create('Get Results from Amazon Search')
	.get('http://www.magicgiftbag.com/data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/Taylor%20Swift')
	.expectStatus(200)
	.expectBodyContains('resultsInfo')
	.expectBodyContains('totalItems')
	.toss();
