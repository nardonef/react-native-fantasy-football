import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import PropTypes from 'prop-types';

const Attribute = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <Text style={styles.stat}>{props.stat}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '25%',
        marginLeft: 1,
        marginRight: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
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

export default Attribute;
