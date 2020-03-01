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
var functionExpressFantasyAccessKeyProdName = process.env.FUNCTION_EXPRESSFANTASYACCESSKEYPROD_NAME
var apiRestAPIApiName = process.env.API_RESTAPI_APINAME

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var _ = require('lodash');
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

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


const {
    getNumberOfTeams,
    getProfile,
    getRoster,
    getUserIdFromRequest,
    getUser,
} = require('./utilityFunctions');

const getTeam = async (userId) => {
    const user = await getUser(AWS, userId);
    const accessKey = _.get(user, 'yahooAccessKey', '');
    const leagueId = _.get(user, 'leagueId', '');

    console.log(leagueId);
    console.log(accessKey);

    const numberOfTeams = await getNumberOfTeams(accessKey, leagueId);
    console.log(numberOfTeams);
    const profile = await getProfile(accessKey, leagueId, numberOfTeams);
    console.log(profile);
    const rawRoster = await getRoster(accessKey, profile);
    const roster = rawRoster.map(player => player.toObject());
    console.log(roster);
    return roster;
};

const getData = async  () => {
    const s3 = new AWS.S3();

    const params = {
        Bucket: "nfl-data-fantasy",
        Key: "playerData.json"
    };

    return await s3.getObject(params).promise();
};

/**********************
 * Example get method *
 **********************/

app.get('/team', async function(req, res) {
    const userId = getUserIdFromRequest(req);
    console.log(userId);

    try {
        const roster = await getTeam(userId);
        console.log(roster);
        res.json({
            data: roster,
        });
    } catch (e) {
        console.log(e);
        res.json({
            error: e,
        });
    }

});

app.get('/team/data', async function(req, res) {
    console.log('getting team with data');
    const userId = getUserIdFromRequest(req);
    console.log(userId);
    try {
        // GET ROSTER
        const roster = await getTeam(userId);

        // GET PLAYER DATA
        const data = await getData();
        const fileContents = data.Body.toString();
        const allPlayersData = JSON.parse(fileContents);
        console.log(allPlayersData.playerStatsTotals);

        const playersWithData = [];
        allPlayersData.playerStatsTotals.forEach((playerData) => {
            if (playerData.position === 'DEF') {
                console.log(playerData);
            }

            const dataPlayerName = `${playerData.player.firstName} ${playerData.player.lastName}`

            roster.forEach((player) => {
                if (player.name === dataPlayerName) {
                    player.stats = playerData;
                    playersWithData.push(player);
                }
            });
        });
        res.json({
            data: playersWithData,
        });
    } catch (e) {
        console.log(e);
        res.json({
            error: e,
        });
    }
});

/****************************
* Example post method *
****************************/

app.post('/team', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/team/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/team', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/team/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/team', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/team/*', function(req, res) {
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
