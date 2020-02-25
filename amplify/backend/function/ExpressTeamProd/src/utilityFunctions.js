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
        const profileData = _.get(rawProfile, 'fantasy_content.team[0]');
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
    console.log(roster);
    return formatYahooRoster(roster);
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

module.exports.getUser = getUser;
module.exports.getUserIdFromRequest = getUserIdFromRequest;
module.exports.getProfile = getProfile;
module.exports.getNumberOfTeams = getNumberOfTeams;
module.exports.getRoster = getRoster;

