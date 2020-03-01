import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import PlayerCard from '../components/PlayerCard';
import {API} from 'aws-amplify';

const ViewTeam = (props) => {
    const [team, setTeam] = useState([]);
    useEffect(() => {
        const apiName = 'team';
        const path = '/team/data';
        API.get(apiName, path)
            .then((response) => {
                setTeam(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const buildRoster = () => {
        if (!_.isArray(team)) {
            return null;
        }

        if (!team.length) {
            return null;
        }

        return team.map((player) => {
            return <PlayerCard
                key={player.name}
                player={player}
            />
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {buildRoster()}
            </ScrollView>
        </SafeAreaView>
    )
};

ViewTeam.defaultProps = {
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

export default ViewTeam;
