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
        if (props.position === 'QB') {
            statsComponents.push(
                <Stat label={'Pass Yds'} stat={props.stats.stats.passing.passYards}/>);
            statsComponents.push(
                <Stat label={'Pass TDs'} stat={props.stats.stats.passing.passTD}/>);
            statsComponents.push(
                <Stat label={'Ints'} stat={props.stats.stats.passing.passInt}/>);
        }

        if (props.position === 'RB') {
            statsComponents.push(
                <Stat label={'Rush Yds'} stat={props.stats.stats.rushing.rushYards}/>);
            statsComponents.push(
                <Stat label={'Rush TDs'} stat={props.stats.stats.rushing.rushTD}/>);
            statsComponents.push(
                <Stat label={'20+ Yd Rush'} stat={props.stats.stats.rushing.rush20Plus}/>);
            statsComponents.push(
                <Stat label={'40+ Yd Rush'} stat={props.stats.stats.rushing.rush40Plus}/>);
        }

        if (props.position === 'WR' || props.position === 'TE') {
            statsComponents.push(
                <Stat label={'Rec Yds'} stat={props.stats.stats.receiving.recYards}/>);
            statsComponents.push(
                <Stat label={'Rec TDs'} stat={props.stats.stats.receiving.recTD}/>);
            statsComponents.push(
                <Stat label={'Targets'} stat={props.stats.stats.receiving.targets}/>);
            statsComponents.push(
                <Stat label={'Receptions'} stat={props.stats.stats.receiving.receptions}/>);
        }

        if (props.position === 'K') {
            statsComponents.push(
                <Stat label={'1-19 Yds'} stat={props.stats.stats.fieldGoals.fgMade1_19}/>);
            statsComponents.push(
                <Stat label={'20-29 Yds'} stat={props.stats.stats.fieldGoals.fgMade20_29}/>);
            statsComponents.push(
                <Stat label={'30-39 Yds'} stat={props.stats.stats.fieldGoals.fgMade30_39}/>);
            statsComponents.push(
                <Stat label={'40-49 Yds'} stat={props.stats.stats.fieldGoals.fgMade40_49}/>);
            statsComponents.push(
                <Stat label={'50+ Yds'} stat={props.stats.stats.fieldGoals.fgMade50Plus}/>);
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
        height:70,
    }
});

export default PlayerStats;
