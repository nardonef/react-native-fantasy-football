import React from 'react'
import {Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';
import styleConstants from '../styles/styleConstants';


const ErrorText = (props) => {
    const{style, value} = props;

    return (
        <Text style={[styles.errorText, style]}>
            {value}
        </Text>
    )
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginBottom: styleConstants.margin,
        marginTop: styleConstants.margin,
    }
});

export default ErrorText;
