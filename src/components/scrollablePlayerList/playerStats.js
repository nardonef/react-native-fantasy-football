import React from 'react'
import {StyleSheet, View} from 'react-native'
import Stat from './stat';

const PlayerStats = (props) => {


    const buildStats = () => {
        if (!props.stats.stats) {
            return null;
        }

        // TODO FIX THIS IN API
        const statsComponents = [];
        if (props.stats.player.primaryPosition === 'QB' || props.stats.player.position === 'QB') {
            statsComponents.push(<Stat label={'Passing Yards'} stat={props.stats.stats.passing.passYards}/>);
            statsComponents.push(<Stat label={'Passing TD\'s'} stat={props.stats.stats.passing.passTD}/>);
            statsComponents.push(<Stat label={'Interception\'s'} stat={props.stats.stats.passing.passInt}/>);
        }

        if (props.stats.player.primaryPosition === 'RB' || props.stats.player.position === 'RB') {
            statsComponents.push(<Stat label={'Rushing Yards'} stat={props.stats.stats.rushing.rushYards}/>);
            statsComponents.push(<Stat label={'Rushing TD\'S'} stat={props.stats.stats.rushing.rushTD}/>);
            statsComponents.push(<Stat label={'20+ Yard Rush\'s'} stat={props.stats.stats.rushing.rush20Plus}/>);
            statsComponents.push(<Stat label={'40+ Yard Rush\'s'} stat={props.stats.stats.rushing.rush40Plus}/>);
        }

        if (props.stats.player.primaryPosition === 'WR' || props.stats.player.primaryPosition === 'TE' || props.stats.player.position === 'WR' || props.stats.player.position === 'TE') {
            statsComponents.push(<Stat label={'Receiving Yards'} stat={props.stats.stats.receiving.recYards}/>);
            statsComponents.push(<Stat label={'Receiving TD\'s'} stat={props.stats.stats.receiving.recTD}/>);
            statsComponents.push(<Stat label={'Targets'} stat={props.stats.stats.receiving.targets}/>);
            statsComponents.push(<Stat label={'Receptions'} stat={props.stats.stats.receiving.receptions}/>);
        }

        if (props.stats.player.primaryPosition === 'K' || props.stats.player.position === 'K') {
            statsComponents.push(<Stat label={'1-19 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade1_19}/>);
            statsComponents.push(<Stat label={'20-29 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade20_29}/>);
            statsComponents.push(<Stat label={'30-39 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade30_39}/>);
            statsComponents.push(<Stat label={'40-49 Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade40_49}/>);
            statsComponents.push(<Stat label={'50+ Yards FG\'s'} stat={props.stats.stats.fieldGoals.fgMade50Plus}/>);
        }

        return statsComponents;
    };

    return (
        <View style={styles.container}>
            {buildStats()}
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        backgroundColor: "#1b2836",
        flexDirection: 'row',
        height:60,
    }
});

export default PlayerStats;
