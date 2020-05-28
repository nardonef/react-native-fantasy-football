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

app.use(async function (req, res, next) {
    const userId = getUserIdFromRequest(req);
    const user = await getUser(AWS, userId);
    console.log(user);
    const leagueId = _.get(user, 'leagueId', '');
    const refreshKey = _.get(user, 'yahooRefreshKey', '');
    console.log(userId);
    console.log(leagueId);

    const token = await refreshToken(userId, refreshKey);

    _.set(req, 'token', token);
    _.set(req, 'leagueId', leagueId);
    next();
});

const teamOrder = ['QB', 'RB', 'WR', 'TE', 'W/R/T', 'K', 'DEF', 'BN'];

const {
    getNumberOfTeams,
    getProfile,
    getRoster,
    getUserIdFromRequest,
    getUser,
    getFreeAgents,
    refreshToken,
} = require('./utilityFunctions');

const getTeam = async (accessKey, leagueId) => {
    const numberOfTeams = await getNumberOfTeams(accessKey, leagueId);
    // console.log(numberOfTeams);

    const profile = await getProfile(accessKey, leagueId, numberOfTeams);
    // console.log(profile);

    const rawRoster = await getRoster(accessKey, profile);
    const roster = rawRoster.map(player => player.toObject());
    // console.log(roster);

    const sortedRoster = sortRoster(roster);
    // console.log(sortedRoster);

    return sortedRoster;
};

const sortRoster = (roster) => {
    const sortedRoster = [];
    teamOrder.forEach((position) => {
        roster.forEach((player) => {
            if(player.fantasyRosterPosition === position) {
                sortedRoster.push(player)
            }
        });
    });
    return sortedRoster;
};

const getData = async  (week) => {
    const s3 = new AWS.S3();

    let params = {
        Bucket: "nfl-data-fantasy",
        Key: "playerData.json"
    };

    let dataProperty = 'playerStatsTotals';

    if (week) {
        params.Bucket = `nfl-week-${week}-data-fantasy`;
        dataProperty = 'gamelogs';
    }

    const data = await s3.getObject(params).promise();
    const fileContents = data.Body.toString();
    const allPlayersData = JSON.parse(fileContents);

    return allPlayersData[dataProperty];
};

const getNews = async () => {
    const s3 = new AWS.S3();

    let params = {
        Bucket: "nfl-news",
        Key: "news.json"
    };

    const data = await s3.getObject(params).promise();
    const fileContents = data.Body.toString();
    return JSON.parse(fileContents);
};

const getPlayerWeeklyData = async (playerName) => {
    const promises = [];
    for (let week=16; week>0; week--) {
        promises.push(getData(week));
    }

    const allWeeksData = await Promise.all(promises);

    const playerStats = {};

    for (let week=1; week<=17; week++) {
        for (const weeklyStats of allWeeksData) {
            if (weeklyStats[0].game.week !== week) {
                continue;
            }

            for (const playerData of weeklyStats) {
                if (`${playerData.player.firstName} ${playerData.player.lastName}` === playerName) {
                    playerStats[week] = playerData;
                    break;
                }
            }

            if (!playerStats[week]) {
                playerStats[week] = {};
            }
        }
    }

    return playerStats;
};

app.get('/team', async function(req, res) {
    try {
        const roster = await getTeam(req.token.access_token, req.leagueId);
        res.json({
            data: roster,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});

app.get('/team/data', async function(req, res) {
    const week = _.get(req.query, 'week', null);
    const position = _.get(req.query, 'position', null);

    try {
        // GET ROSTER
        const roster = await getTeam(req.token.access_token, req.leagueId);

        // GET PLAYER DATA
        const data = await getData(week);

        const playersWithData = [];
        data.forEach((playerData) => {
            const dataPlayerName = `${playerData.player.firstName} ${playerData.player.lastName}`;

            roster.forEach((player) => {
                if (player.name === dataPlayerName) {
                    if (position) {
                        if (player.position !== position) {
                            return;
                        }
                    }
                    player.stats = playerData;
                    playersWithData.push(player);
                }
            });
        });

        // Seems that either there are either players missing from the data set or
        // if a player didn't play on a week they are not included in the data set
        // this is so we have the full roster in the response
        roster.forEach((rosterPlayer) => {
            if (position) {
                if (rosterPlayer.position !== position) {
                    return;
                }
            }

            let inResponse = false;
            playersWithData.forEach((player) => {
                if (rosterPlayer.name === player.name) {
                    inResponse = true;
                }
            });

            if (!inResponse) {
                playersWithData.push(rosterPlayer);
            }
        });

        const sortedPlayersWithData = sortRoster(playersWithData);
        res.json({
            data: sortedPlayersWithData,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
});

app.get('/team/player/:playerName', async function(req, res) {
    try {
        const weeklyPlayerData = await getPlayerWeeklyData(_.startCase(req.params.playerName));
        res.json({
            data: weeklyPlayerData,
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

});

//TODO change to free agents
app.get('/team/waiver-wire', async function(req, res) {
    try {
        const freeAgents = await getFreeAgents(req.token.access_token, req.leagueId);
        const freeAgentsResponse = freeAgents.map(player => player.toObject());
        res.json({
            data: freeAgentsResponse,
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

});

app.get('/team/news', async function(req, res) {
    try {
        const news = await getNews();
        res.json({
            data: news,
        })
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }

});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app;
