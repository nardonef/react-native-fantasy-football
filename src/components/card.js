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
            {props.children}
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
        backgroundColor: '#d8b075',
        marginTop: StyleConsts.margin,
        marginBottom: StyleConsts.margin,
        borderRadius: 10,
    },
    titleText: {
        fontSize: StyleConsts.largeText,
        marginLeft: StyleConsts.smallMargin,
        marginBottom: StyleConsts.smallMargin,
        marginTop: 5,
        fontWeight: '700'
    },
    arrowContainer: {
        alignItems: 'center',
    }
});

export default Card;
