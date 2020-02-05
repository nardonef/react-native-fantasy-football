import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, Dimensions} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import styleConstants from '../styles/styleConstants';

const Button = (props) => {
    return (
        <Text style={[styles.logInButton, props.style]} onPress={props.onPress}>
            {props.title}
        </Text>
    )
};

const styles = StyleSheet.create({
    logInButton: {
        backgroundColor: styleConstants.secondaryColor,
        color: 'white',
        fontSize: 14,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        marginTop: styleConstants.margin,
        width: '70%',
        borderRadius: 5,
        borderWidth: 1,
    }
});

export default Button;

