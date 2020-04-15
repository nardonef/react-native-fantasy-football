import React from 'react'
import {StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types';
import styleConstants from '../styles/styleConstants';

const Button = (props) => {
    return (
        <Text style={[styles.button, props.style]} onPress={props.onPress}>
            {props.title}
        </Text>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: styleConstants.secondaryColor,
        color: styleConstants.tweetsColor,
        fontSize: 14,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        marginTop: styleConstants.margin,
        width: '70%',
        borderRadius: 5,
        borderWidth: 1,
        fontWeight: 'bold'
    }
});

export default Button;

