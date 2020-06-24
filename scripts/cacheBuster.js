var AWS = require('aws-sdk')
var creds = require('../.awsConfig.json')
var prodCreds = require('../.awsConfig-production.json')

var params = {
  DistributionId: process.env.REACT_APP_STAGE === 'production' ? 'E1QM5ZHUXV3B3X' : 'E2IT32DS8KC7DO', /* required */
  InvalidationBatch: { /* required */
    CallerReference: new Date().getTime().toString(), /* required */
    Paths: { /* required */
      Quantity: 1, /* required */
      Items: [
        '/index.html'
        /* more items */
      ]
    }
  }
}
var cloudfront = new AWS.CloudFront(process.env.REACT_APP_STAGE === 'production' ? prodCreds : creds)
cloudfront.createInvalidation(params, function (err, data) {
  if (err) console.log('Property Leads Cloudfront Error:', err, err.stack) // an error occurred
  else console.log((process.env.REACT_APP_STAGE === 'production' ? 'Prod ' : '' ) + 'Cache busted for Property Leads\n') // successful response
})