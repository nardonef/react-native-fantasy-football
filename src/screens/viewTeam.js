import React, {useEffect, useRef, useState} from 'react'
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
    // const [scrollPosition, setScrollPosition] = useState(0);
    const scrollViewRef = useRef();


    useEffect(() => {
        if(team.length !== 0) {
            return;
        }

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

        // console.log(team);

        // team.sort((a, b) => {
        //     console.log(a.position);
        //     if (a.position === 'QB') {
        //         return -1;
        //     }
        //
        //     if (b.position === 'K') {
        //         return -1;
        //     }
        // });

        // console.log(team);

        return team.map((player) => {
            return <PlayerCard
                key={player.name}
                player={player}
                stats={player.stats}
                // scrollPosition={scrollPosition}
                // setScrollPosition={setScrollPosition}
                scrollViewRef={scrollViewRef}
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
        height: Dimensions.get('window').height-88,
        backgroundColor: '#1b2836',

    },
});

export default ViewTeam;
