import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    View
} from 'react-native'
import _ from 'lodash';
import PlayerInfo from '../components/playerCard/playerInfo';
import PlayerStats from '../components/playerCard/playerStats';
import StatFilterHeader from '../components/playerCard/statFilterHeader';
import {API} from 'aws-amplify';

const ViewWaiverWire = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        if(team.length !== 0) {
            return;
        }

        const apiName = 'team';
        const path = '/team/waiver-wire';
        API.get(apiName, path)
            .then((response) => {
                console.log(response);
                setTeam(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const buildPlayerInfo = () => {
        if (!_.isArray(team)) {
            return null;
        }

        if (!team.length) {
            return null;
        }

        return team.map((player) => {
            return <PlayerInfo key={player.name} player={player} theme={'dark'}/>
        });
    };

    const buildPlayerStats = () => {
        if (!_.isArray(team)) {
            return null;
        }

        if (!team.length) {
            return null;
        }

        return team.map((player) => {
            return <PlayerStats stats={player.stats}/>
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatFilterHeader/>
            <ScrollView horizontal={false}>
                <View style={styles.verticalScroll}>
                    <View style={styles.playerInfoContainer}>
                        {buildPlayerInfo()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height-88,
        backgroundColor: '#1b2836',
    },
    verticalScroll: {
        flex: 1,
        flexDirection: 'row',
    },
    playerInfoContainer: {
        flex: 1,
    },
    playerStatsContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: -50,
    }
});

export default ViewWaiverWire;
