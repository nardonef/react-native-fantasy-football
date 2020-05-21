import React from 'react'
import {StyleSheet, View} from 'react-native'
import PositionStatCategories from '../positionStatCategories'
import _ from 'lodash'
import Stat from './stat';

const PlayerStats = (props) => {
    console.log(props.stats);
    const buildStats = () => {
        if (!props.stats) {
            return null;
        }

        const statsComponents = [];
        _.forOwn(PositionStatCategories[props.position], (value, key) => {
            statsComponents.push(<Stat label={key} stat={_.get(props.stats, value, '')}/>)
        });
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
