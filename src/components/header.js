import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View
} from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import styleConstants from '../styles/styleConstants';

const Header = (props) => {
    return (
        <View style={styles.container}>
            <Icon name="menu" size={35} color={styleConstants.tweetsColor} />
            {props.centerComponent}
            <Icon name="menu" size={35} color={'white'} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 85,
        backgroundColor: styleConstants.tweetsColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 30,
        alignItems: 'center'
    },

});

export default Header;
