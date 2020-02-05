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
import constants from '../constants';

const Test = (props) => {
    const [profile, setProfile] = useState([]);
    const [roster, setRoster] = useState({});
    const [leagueId, setLeagueId] = useState('');
    const {access_token} = props.navigation.state.params;
    // const leagueId = 717523;
    const gameId = constants.gameId;

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
                //console.log(isOwner);
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
        console.log(data);
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
        console.log(roster);
        const formattedRoster = formatYahooRoster(roster);
        setRoster(formattedRoster);
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

        AsyncStorage.getItem('roster')
            .then((oldRoster) => {
                if (_.isEmpty(roster) && oldRoster) {
                    const formattedRoster = formatYahooRoster(JSON.parse(oldRoster));
                    setRoster(formattedRoster);
                }
            })
            .catch(e => console.log);

        if (leagueId === '') {
            getLeaugeId();
        }
    }, []);

    useEffect(() => {
        const initGetProfile = async () => {
            const numberOfTeams = await getNumberOfTeams().catch(e => console.log);
            await getProfile(numberOfTeams);
        };
        //TODO ASYNCSTORAGRE
        if (leagueId) {
            initGetProfile();
        }
    }, [leagueId]);

    useEffect(() => {
        const getRosterAsync = async () => {
            await getRoster(profile);
        };

        if (profile.length !== 0) {
            console.log('here');
            getRosterAsync();
        }
    }, [profile]);

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

    // console.log(leagueId);
    // console.log(roster);
    // console.log(profile);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {buildRoster()}
            </ScrollView>
        </SafeAreaView>
    )
};

Test.defaultProps = {
    navigation: {
        state: {
            params: {
                access_token: '',
            }
        }
    },
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#1b2836',
    },
});

export default Test;
