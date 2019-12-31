import React, {useEffect, useState} from 'react'
import {TextInput, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';
import styleConstants from '../styles/styleConstants';


const FormTextInput = (props) => {
    const{style, ...otherProps} = props;
    return (
        <TextInput
            placeholderStyle={styles.placeholderStyle}
            placeholderTextColor={'#D8D8D8'}
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
        marginBottom: styleConstants.margin,
        marginTop: styleConstants.margin,
        width: '75%',
    }
});

export default FormTextInput;
