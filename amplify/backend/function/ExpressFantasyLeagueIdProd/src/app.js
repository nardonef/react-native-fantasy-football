/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authFantasyproda0d09a47UserPoolId = process.env.AUTH_FANTASYPRODA0D09A47_USERPOOLID

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var _ = require('lodash');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/league-id', function(req, res) {

    const userId = _.get(req, 'query.userId', '');

    console.log(userId);

    const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    const params = {
        TableName: 'Fantasy-Prod',
        Key: {
            'id' : {S: userId},
            'type': {S: 'USER'},
        }
    };

    ddb.getItem(params, function(err, data) {
        console.log(AWS.DynamoDB.Converter.unmarshall(data.Item));
        if (err) {
            console.log("Error ", err);
            res.json({
                error: err,
            });
        } else {
            console.log("Success", data);
            res.json({
                leagueId: _.get(AWS.DynamoDB.Converter.unmarshall(data.Item), 'leagueId', null),
            });
        }
    });
});

app.get('/league-id/*', function(req, res) {

});

/****************************
* Example post method *
****************************/

app.post('/league-id', function(req, res) {
    const userId = _.get(req, 'body.userId', '');
    const leagueId = _.get(req, 'body.leagueId', '');

    console.log(userId);
    console.log(leagueId);

    const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    const params = {
        TableName: 'Fantasy-Prod',
        Key: {
            'id' : {S: userId},
            'type': {S: 'USER'},
        },
        UpdateExpression: "set leagueId = :id",
        ExpressionAttributeValues:{
            ":id": {S: leagueId},
        },
    };

    ddb.updateItem(params, function(err, data) {
        if (err) {
            console.log("Error ", err);
            res.json({
                error: err,
            });
        } else {
            console.log("Success", data);
            res.json({
                data: data,
            });
        }
    });
});

app.post('/league-id/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/league-id', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/league-id/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/league-id', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/league-id/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
