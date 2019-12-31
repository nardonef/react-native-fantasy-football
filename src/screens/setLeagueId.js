import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
    Dimensions, TouchableOpacity, Image,
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import styleConstants from '../styles/styleConstants';
import Test from "./Test";
import YahooFantasyAppImage from '../../assets/yahooFantasyAppLogo.png';

const SetLeagueId = (props) => {
    const [username, setUsername] = useState('');

    const navigateToSignUp = () => {
        const {navigate} = props.navigation;
        navigate('SignIn');
    };

    return (
        <View style={styles.background}>
            <View style={styles.pageContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.header}>
                        Due to problems with Yahoo you must manually enter your leaugeId
                    </Text>
                </View>
                <View style={styles.textContainer}>
                <Text style={styles.header}>
                    1. Open up Yahoo Fantasy App
                </Text>
                <Image
                    style={styles.profileImage}
                    source={YahooFantasyAppImage}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.header}>
                    2. Choose your league you want to use.
                </Text>
            </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: styleConstants.backgroundColor,
        marginLeft: styleConstants.margin,
        marginRight: styleConstants.margin,
        flex: 1,
        marginTop:50
    },
    profileImage: {
        height: 70,
        width: 70,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.backgroundColor,
    },
    header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: styleConstants.largeText,
    },
});

export default SetLeagueId;
