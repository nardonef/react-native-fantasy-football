import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';

const Test = (props) => {
    const [profile, setProfile] = useState([]);
    const [roster, setRoster] = useState({});
    const {access_token} = props.navigation.state.params;
    const leaugeId = 717523;
    const gameId = 390;

    const getProfile =  async(numberOfTeams) => {
        while (numberOfTeams > 0) {
            const dataurl = `https://fantasysports.yahooapis.com/fantasy/v2/team/${gameId}.l.${leaugeId}.t.${numberOfTeams}?format=json`;

            const response = await fetch(dataurl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });

            const rawProfile = await response.json();
            const profileData = _.get(rawProfile, 'fantasy_content.team[0]');
            _.forEach(profileData, (dataElement) => {
                const isOwner = _.get(dataElement, 'is_owned_by_current_login', false);
                if(isOwner) {
                    setProfile(profileData);
                    // AsyncStorage.setItem('profile', JSON.stringify(profileData)).then();
                }
            });
            numberOfTeams--;
        }
    };


    const getNumberOfTeams = async () => {
        const dataurl = `https://fantasysports.yahooapis.com/fantasy/v2/league/${gameId}.l.${leaugeId}?format=json`;

        const response = await fetch(dataurl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const data = await response.json();
        return _.get(data, 'fantasy_content.league[0].num_teams', 18);
    }

    const getRoster = async () => {
        const teamKey = _.get(profile, '[0].team_key', false);

        if (!teamKey) {
            return;
        }

        const dataurl = `https://fantasysports.yahooapis.com/fantasy/v2/team/${teamKey}/roster?format=json`;

        const response = await fetch(dataurl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const rosterData = await response.json();
        const roster = _.get(rosterData, `fantasy_content.team[1].roster['0'].players`);
        setRoster(roster);
        AsyncStorage.setItem('roster', JSON.stringify(roster)).then();
    }

    const printPlayersNames = (players) => {
        _.forOwn(players, (player) => {
            console.log(_.get(player, `player[0][2].name.full`, ''));
        });
        // console.log(rosterData.fantasy_content.team[1].roster['0'].players['0'].player[0][2].name.full);
    };

    useEffect(() => {
        const initGetProfile = async () => {
            const numberOfTeams = await getNumberOfTeams();
            await getProfile(numberOfTeams);
        };
        //TODO ASYNCSTORAGRE
        initGetProfile();
    }, []);

    useEffect(() => {
        const getRosterAsync = async () => {
            await getRoster(profile);
        };

        AsyncStorage.getItem('roster').then((oldRoster) => {
            if (_.isEmpty(roster)) {
                setRoster(JSON.parse(oldRoster));
            }
        });

        if (profile.length !== 0) {
            getRosterAsync();
        }
    }, [profile]);

    const buildRoster = () => {
        if (_.isEmpty(roster)) {
            return null;
        }

        const rosterTextNodes = [];
        _.forOwn(roster, (player) => {
            const playersName = _.get(player, `player[0][2].name.full`, '');
            rosterTextNodes.push(<Text key={playersName}>{playersName}</Text>);
        });
        return rosterTextNodes;
    }

    return (
        <View style={styles.container}>
            <View stle={styles.form}>
                <Text>test9</Text>
                {buildRoster()}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 300,

    },
    form: {
        marginTop: 300,
        flex: 1,
        justifyContent: 'center',
        width: '80%'
    },
    logInButton: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        fontSize: 14,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        marginTop: 20,
    },
});

export default Test;
