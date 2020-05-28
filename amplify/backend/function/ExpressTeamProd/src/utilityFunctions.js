const yahooConfig = require("./yahooConfig");
const {Base64} = require("js-base64");
const AWS = require('aws-sdk');
const {formatYahooRoster} = require('./Player');
const _ = require('lodash');
const fetch = require("node-fetch");

const urlBase = 'https://fantasysports.yahooapis.com/fantasy/v2';
const gameId = '390';

const getProfile = async (accessToken, leagueId, numberOfTeams) => {
    let data = null;
    while (numberOfTeams > 0) {
        const dataUrl = `${urlBase}/team/${gameId}.l.${leagueId}.t.${numberOfTeams}?format=json`;

        const response = await fetch(dataUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const rawProfile = await response.json();
        const profileData = _.get(rawProfile, 'fantasy_content.team[0]', []);
        console.log(profileData);
        _.forEach(profileData, (dataElement) => {
            const isOwner = _.get(dataElement, 'is_owned_by_current_login', false);
            if(isOwner) {
                numberOfTeams = 0;
                data = profileData;
            }
        });
        numberOfTeams--;
    }

    if (!data) {
        throw new Error('No Profile found');
    }

    return data;
};

const getNumberOfTeams = async (accessToken, leagueId) => {
    const dataUrl = `${urlBase}/league/${gameId}.l.${leagueId}?format=json`;

    const response = await fetch(dataUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return _.get(data, 'fantasy_content.league[0].num_teams', 18);
};

const getRoster = async (accessToken, profile) => {
    const teamKey = _.get(profile, '[0].team_key', false);

    if (!teamKey) {
        return;
    }

    const dataUrl = `${urlBase}/team/${teamKey}/roster?format=json`;

    const response = await fetch(dataUrl, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const rosterData = await response.json();
    const roster = _.get(rosterData, `fantasy_content.team[1].roster['0'].players`);
    // _.forOwn(roster, (rosterArray) => {
    //     if (typeof rosterArray === 'object' && rosterArray !== null) {
    //         rosterArray.player.forEach((x) => {
    //             console.log(x);
    //         });
    //     }
    // });
    return formatYahooRoster(roster);
};

const getFreeAgents = async (accessToken, leagueId) => {
    let start = 0;
    let done= false;
    const freeAgents = [];
    while (!done) {
        const dataUrl = `${urlBase}/league/${gameId}.l.${leagueId}/players;start=${start}?format=json`;

        const response = await fetch(dataUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        console.log(JSON.stringify(data.fantasy_content.league[1].players));

        freeAgents.push(...formatYahooRoster(data.fantasy_content.league[1].players));

        // if (data.fantasy_content.league[1].players.count !== 25) {
        //     done=true;
        // }

        if (start > 99) {
            done=true;
        }

        start = start +25;
    }

    return freeAgents;
};

const getFreeAgentsYahoo = async (accessToken, leagueId) => {
    let start = 0;
    let done= false;
    const freeAgents = [];
    while (!done) {
        const dataUrl = `${urlBase}/league/${gameId}.l.${leagueId}/players;start=${start}?format=json`;

        const response = await fetch(dataUrl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        // _.forOwn(data.fantasy_content.league[1].players, (player) => {
        //     if (typeof player !== 'object' || player === null) {
        //         return;
        //     }
        //
        //     console.log(player.player[0]);
        // });

        freeAgents.push(formatYahooRoster(data.fantasy_content.league[1].players));
        console.log(freeAgents);
        if (data.fantasy_content.league[1].players.count !== 25) {
            done=true;
        }

        start = start +25;
    }

    return freeAgents;
};

const getUserIdFromRequest = (req) => {
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
    const authProvider = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider;
    const [, , , userId] = authProvider.match(IDP_REGEX);
    return userId
};

const getUser = async (AWS, userId) => {
    const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    const params = {
        TableName: 'Fantasy-Prod',
        Key: {
            'id' : {S: userId},
            'type': {S: 'USER'},
        }
    };

    try {
        const data = await ddb.getItem(params).promise();
        return AWS.DynamoDB.Converter.unmarshall(data.Item);
    } catch (e) {
        console.log(e);
        throw new Error('Error getting user')
    }
};


const getRefreshToken = async (codeOrToken) => {
    const bodyJson = {
        client_id: yahooConfig.client_id,
        client_secret: yahooConfig.client_secret,
        redirect_uri: yahooConfig.redirect_uri,
        refresh_token: codeOrToken,
        grant_type: 'refresh_token',
    };

    const tokenUrl = `https://api.login.yahoo.com/oauth2/get_token`;
    const authCode = Base64.encode(`${yahooConfig.client_id}:${yahooConfig.client_secret}`);

    let token = null;
    // TODO figure out why URLSearchParams  not working
    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${authCode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=dj0yJmk9NURIZ2lUeHdReWx2JmQ9WVdrOWRtbDVUamRNTnpRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTAw&client_secret=d05fe48dbb8e64c4c7f8bdb88d505ba7fead39bd&redirect_uri=footballtweets://auth&refresh_token=${codeOrToken}&grant_type=refresh_token`
        });

        token = await response.json();
    } catch (e) {
        console.log(e);
        throw new Error('Error getting token');
    }

    console.log(token);
    if (token.error || !token.refresh_token) {
        throw new Error('No token');
    }

    return token;
};


const refreshToken = async (userId, refreshToken) => {
    try {
        const token = await getRefreshToken(refreshToken);

        // TODO make into own function
        const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

        const params = {
            TableName: 'Fantasy-Prod',
            Key: {
                'id' : {S: userId},
                'type': {S: 'USER'},
            },
            UpdateExpression: "set yahooAccessKey = :yak, yahooRefreshKey = :yrk",
            ExpressionAttributeValues:{
                ":yak": {S: token.access_token},
                ":yrk": {S: token.refresh_token},
            },
        };

        ddb.updateItem(params, function(err, data) {
            if (err) {
                console.log("Error ", err);
                throw new Error('couldnt refresh token');

            } else {
                console.log("Successfully store token");
            }
        });

        return token;
    } catch (e) {
        console.log(e);
        throw new Error('couldnt refresh token');
    }
};

module.exports.getUser = getUser;
module.exports.getUserIdFromRequest = getUserIdFromRequest;
module.exports.getProfile = getProfile;
module.exports.getNumberOfTeams = getNumberOfTeams;
module.exports.getRoster = getRoster;
module.exports.getFreeAgents = getFreeAgents;
module.exports.refreshToken = refreshToken;
