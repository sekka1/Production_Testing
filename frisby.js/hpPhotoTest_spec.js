/*
 * Testing the Facebook API services
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
* Get the auth token from HP Cloud Services, then use that auth to generate a collage with some facebook photos
* 
* Might want to becareful if this errors.  The fb photos might not be there which would produce an error
*/
frisby.create('HP Photo - Get Auth')
  .timeout(60000)
  .post(URL + '/jobs',{
  			job_params:'{"job":{"algorithm":{"id":"33","params":{"hp_username":"garland","hp_password":"teachMe!","hp_tenantID":"41738351831371","params":[]}},"outputType":"json","method":"sync","datasources":[]}}'
  			}
  		)
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
  	hp_authToken: String
  })
  .afterJSON(function(authToken){
  				frisby.create('Create Collage')
  					.timeout(60000)
  					.post(URL + '/jobs',{
  								job_params:'{"job":{"algorithm":{"id":"34","params":{"hp_authToken":"'+authToken.hp_authToken+'","hp_template_url":"https://region-a.geo-1.objects.hpcloudsvc.com:443/v1/41738351831371/collage-templates/template-heart.png","params":["https://sphotos-a.xx.fbcdn.net/hphotos-ash4/s480x480/247260_10151103681597099_539178508_n.jpg","https://sphotos-a.xx.fbcdn.net/hphotos-ash3/s480x480/550128_10150692414992099_1896023911_n.jpg"]}},"outputType":"json","method":"sync","datasources":[]}}'
  						})
  					.expectBodyContains('collage')
  					//.inspectBody()
  					.toss();
  })
	  
  
  .toss();