import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    View,
    Text
} from 'react-native'
import _ from 'lodash';
import PlayerInfo from './scrollablePlayerList/playerInfo';
import StyleConsts from "../styles/styleConstants";
import Icon from "react-native-vector-icons/FontAwesome5";

const Card = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.title}</Text>
            <PlayerInfo player={
                {
                    name: 'Frank Nardone',
                    abbreviatedTeamName: 'NYJ',
                    position: 'RB'
                }}
            />
            <PlayerInfo player={
                {
                    name: 'Frank Nardone',
                    abbreviatedTeamName: 'NYJ',
                    position: 'RB'
                }}
            />
            <View style={styles.arrowContainer}>
                <Icon
                    // onPress={handleLeftPress}
                    name="caret-down"
                    size={30}
                    color={'white'}
                    style={styles.arrow}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 190,
        backgroundColor: '#d05d39',
        marginTop: StyleConsts.margin,
        marginBottom: StyleConsts.margin,
    },
    titleText: {
        fontSize: StyleConsts.largeText,
        marginLeft: StyleConsts.smallMargin,
        marginBottom: StyleConsts.smallMargin,
        marginTop: 5,
    },
    arrowContainer: {
        alignItems: 'center',
    }
});

export default Card;
