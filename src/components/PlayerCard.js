import React, {useRef, useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView, SafeAreaView,
} from 'react-native'
import PlayerStat from './playerStat';
import PropTypes from 'prop-types';
import Tweet from "./tweet";
import PTRView from "react-native-pull-to-refresh";

const PlayerCard = (props) => {

    const buildStats = () => {
        if (!props.stats.stats) {
            return null;
        }

        const statsComponents = [];
        if (props.stats.player.primaryPosition === 'QB') {
            statsComponents.push(<PlayerStat label={'Passing Yards'} stat={props.stats.stats.passing.passYards}/>);
            statsComponents.push(<PlayerStat label={'Passing TD\'s'} stat={props.stats.stats.passing.passTD}/>);
            statsComponents.push(<PlayerStat label={'Interception\'s'} stat={props.stats.stats.passing.passInt}/>);
        }

        if (props.stats.player.primaryPosition === 'RB') {
            statsComponents.push(<PlayerStat label={'Rushing Yards'} stat={props.stats.stats.rushing.rushYards}/>);
            statsComponents.push(<PlayerStat label={'Rushing TD\'S'} stat={props.stats.stats.rushing.rushTD}/>);
            statsComponents.push(<PlayerStat label={'20+ Yard Rush\'s'} stat={props.stats.stats.rushing.rush20Plus}/>);
            statsComponents.push(<PlayerStat label={'40+ Yard Rush\'s'} stat={props.stats.stats.rushing.rush40Plus}/>);
        }

        if (props.stats.player.primaryPosition === 'WR' || props.stats.player.primaryPosition === 'TE') {
            statsComponents.push(<PlayerStat label={'Receiving Yards'} stat={props.stats.stats.receiving.recYards}/>);
            statsComponents.push(<PlayerStat label={'Receiving TD\'s'} stat={props.stats.stats.receiving.recTD}/>);
            statsComponents.push(<PlayerStat label={'Targets'} stat={props.stats.stats.receiving.targets}/>);
            statsComponents.push(<PlayerStat label={'Receptions'} stat={props.stats.stats.receiving.receptions}/>);
        }

        if (props.stats.player.primaryPosition === 'K') {
            statsComponents.push(<PlayerStat label={'1-19 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade1_19}/>);
            statsComponents.push(<PlayerStat label={'20-29 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade20_29}/>);
            statsComponents.push(<PlayerStat label={'30-39 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade30_39}/>);
            statsComponents.push(<PlayerStat label={'40-49 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade40_49}/>);
            statsComponents.push(<PlayerStat label={'50+ Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade50Plus}/>);
        }


        const handleStatScroll = (event) => {
            console.log(event.nativeEvent.contentOffset.x);
            props.scrollViewRef.current.scrollTo({x: event.nativeEvent.contentOffset.x});
        };

        return  <ScrollView
            horizontal= {true}
            style={styles.scroll}
            onScroll={handleStatScroll}
            scrollEventThrottle={16}
            ref={props.scrollViewRef}
        >
            {statsComponents}
        </ScrollView>
    };


    const buildName = () => {
        if (!props.player.name) {
            return null;
        }

        const nameArray = props.player.name.split(' ');

        return `${nameArray[0].charAt(0)}. ${nameArray[1]}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.playerContainer}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{uri: props.player.picture}}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{buildName()}</Text>
                    <View style={styles.bottomSection}>
                        <Text style={styles.bottomSectionText}>{props.player.abbreviatedTeamName}</Text>
                        <Text style={styles.bottomSectionText}>{props.player.position}</Text>
                    </View>
                </View>
            </View>
            {buildStats()}
        </View>
    )
};


const styles = StyleSheet.create({
    playerContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        marginRight: -25,
    },
    scroll: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },
    bottomSection: {
        flex: 1,
        flexDirection: 'row'
    },
    bottomSectionText: {
        color: 'white',
        fontSize: 10,
        marginBottom: 5,
        marginRight: 3,
    },
    textContainer: {
        paddingLeft: 10,
    },
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        backgroundColor: "#1b2836",
        flexDirection: 'row',
    },
    name: {
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 5,
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius:40,
    },
    profileImageContainer: {
        paddingLeft: 15,
        paddingRight: 15,
    }
});

export default PlayerCard;
