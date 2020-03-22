import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import PropTypes from 'prop-types';

const Stat = (props) => {
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
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 10,
    },
    stat: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        marginTop: 10
    }
});

export default Stat;
