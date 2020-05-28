import React, {useEffect, useState, useContext} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    View,
    Text,
    Button
} from 'react-native'
import _ from 'lodash';
import StyleConstants from '../styles/styleConstants'
import PlayerInfo from '../components/playerCard/playerInfo';
import PlayerStats from '../components/playerCard/playerStats';
import StatFilterHeader from '../components/playerCard/statFilterHeader';
import PlayerModal from '../components/playerModal/playerModal';
import {API} from 'aws-amplify';
import Modal from 'react-native-modal';

const ViewTeamContext = React.createContext([{}, () => {
}]);

const ViewTeam = (props) => {
    const [team, setTeam] = useState([]);
    const [modalData, setModalData] = useState({});
    const [viewTeamState, setViewTeamState] = useState({
        week: '0',
        position: 'all',
    });

    useEffect(() => {
        const apiName = 'team';
        let path = '/team/data';
        let options = {
            queryStringParameters: {},
        };

        if (viewTeamState.week !== '0') {
            options.queryStringParameters.week = viewTeamState.week;
        }

        if (viewTeamState.position !== 'all') {
            options.queryStringParameters.position = viewTeamState.position;

        }

        API.get(apiName, path, options)
            .then((response) => {
                console.log(response);
                setTeam(response.data);
            })
            .catch((e) => {
                console.log(JSON.stringify(e));
            });
    }, [viewTeamState.week, viewTeamState.position]);

    const buildPlayerInfo = () => {
        if (!_.isArray(team)) {
            return null;
        }

        if (!team.length) {
            return null;
        }

        return team.map((player) => {
            return <PlayerInfo
                onClick={()=>{
                    console.log('clicked');
                    setModalData(player)
                }}
                key={player.name}
                player={player}
                theme={'dark'}
            />
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
            return <PlayerStats
                position={player.position}
                // TODO fix stats.stats on backend
                stats={_.get(player, 'stats.stats', {})}
            />
        });
    };

    return (
        <ViewTeamContext.Provider value={[viewTeamState, setViewTeamState]}>
            <SafeAreaView style={styles.container}>
                <StatFilterHeader navigation={props.navigation}/>
                <ScrollView horizontal={false}>
                    <View style={styles.verticalScroll}>
                        <View style={styles.playerInfoContainer}>
                            {buildPlayerInfo()}
                        </View>
                        <ScrollView style={styles.playerStatsContainer}>
                            {buildPlayerStats()}
                        </ScrollView>
                    </View>
                </ScrollView>
                <Modal isVisible={!_.isEmpty(modalData)}>
                    <PlayerModal
                        player={modalData}
                        closeModal={() => setModalData({})}
                    />
                </Modal>
            </SafeAreaView>
        </ViewTeamContext.Provider>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 88,
        backgroundColor: StyleConstants.tweetsColor,
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
        borderRadius: 10,
    }
});

export {ViewTeamContext, ViewTeam};
