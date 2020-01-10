import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import PlayerCard from '../components/PlayerCard';
import {Player, formatYahooRoster} from '../models/Player';

const Test = (props) => {
    const [profile, setProfile] = useState([]);
    const [roster, setRoster] = useState({});
    const [leagueId, setLeagueId] = useState('');
    const {access_token} = props.navigation.state.params;
    // const leagueId = 717523;
    const gameId = 390;

    const getProfile = async (numberOfTeams) => {
        while (numberOfTeams > 0) {
            const dataurl = `https://fantasysports.yahooapis.com/fantasy/v2/team/${gameId}.l.${leagueId}.t.${numberOfTeams}?format=json`;

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
        const dataurl = `https://fantasysports.yahooapis.com/fantasy/v2/league/${gameId}.l.${leagueId}?format=json`;

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
        const formattedRoster = formatYahooRoster(roster);
        setRoster(formattedRoster);
        // TODO STORE OBJECTS IN ASYNCSTORAGE
        AsyncStorage.setItem('roster', JSON.stringify(roster)).then();
    };

    useEffect(() => {
        const getLeaugeId = async () => {
            try {
                setLeagueId(await AsyncStorage.getItem('league_id'))
            } catch (e) {
                console.log(e);
            }
        };
        getLeaugeId();
    }, []);

    useEffect(() => {
        const initGetProfile = async () => {
            const numberOfTeams = await getNumberOfTeams();
            await getProfile(numberOfTeams);
        };
        //TODO ASYNCSTORAGRE
        initGetProfile();
    }, [leagueId]);

    useEffect(() => {
        const getRosterAsync = async () => {
            await getRoster(profile);
        };

        if (profile.length !== 0) {
            getRosterAsync();
        }
    }, [profile]);

    AsyncStorage.getItem('roster').then((oldRoster) => {
        if (_.isEmpty(roster)) {
            const formattedRoster = formatYahooRoster(JSON.parse(oldRoster));
            setRoster(formattedRoster);
        }
    });

    const buildRoster = () => {
        if (!_.isArray(roster)) {
            return null;
        }

        if (!roster.length) {
            return null;
        }

        return roster.map((player) => {
            return <PlayerCard
                key={player.name}
                player={player}
            />
        });
    }

    // const getPlayerTeamAbbiviated = (player) => {
    //     const team = _.get(player, `player[0][6].editorial_team_abbr`, '');
    //
    //     if (!team) {
    //         return _.get(player, `player[0][6].editorial_team_full_name`, '')
    //             .substring(0,3);
    //     }
    //
    //     return team
    // };

    console.log(leagueId);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {buildRoster()}
            </ScrollView>
        </SafeAreaView>
    )
};

// Test.navigationOptions = {
//     title: 'Home',
//     headerStyle: {
//         backgroundColor: '#f4511e',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//         fontWeight: 'bold',
//     },
// };

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // backgroundColor: '#1b2836',
    },
});

export default Test;
