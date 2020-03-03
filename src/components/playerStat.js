import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native'
import PropTypes from 'prop-types';
import Test from "../screens/Test";

const PlayerStat = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <Text style={styles.stat}>{props.stat}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 90,
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 10,
        marginTop: -15,
    },
    stat: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        marginTop: 15
    }
});

export default PlayerStat;
