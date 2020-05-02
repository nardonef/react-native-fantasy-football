import React from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import PropTypes from 'prop-types';

const TileContainer = (props) => {
    return (
        <View style={styles.container}>
            {props.component}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        backgroundColor: "#1b2836",
        alignSelf: "stretch",
        flexDirection: 'row'
    },
});

export default TileContainer;
