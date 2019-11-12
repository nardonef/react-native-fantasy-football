import React, {useEffect, useState} from 'react'
import {TextInput, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';

const FormTextInput = (props) => {
    const{style, ...otherProps} = props;
    return (
        <TextInput
            style={[styles.textInput, style]}
            {...otherProps}
        />
    )
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: 'silver',
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 20,
        width: 250
    }
});

export default FormTextInput;
