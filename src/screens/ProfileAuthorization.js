import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text, Dimensions,
} from 'react-native'
import PropTypes from 'prop-types';
import styleConstants from '../styles/styleConstants';
import {checkForRefreshToken, OAuth} from '../Authentication/yahooAuth';
import {API} from 'aws-amplify';

const ProfileAuthorization = (props) => {
    const {navigate} = props.navigation;

    const auth = async () => {
        await OAuth(navigate, 'HomeNavigator');
    };

    useEffect(() => {
        checkForRefreshToken()
            .then((token) => {
                navigate('HomeNavigator', {access_token: token.access_token})
            })
            .catch(() =>{});
    }, []);

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.authText}>
                    For the optimal experience authorize access to your team
                    by signing in to your Yahoo account
                </Text>
                <Text style={styles.yahooButton} onPress={auth}>
                    Yahoo
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.backgroundColor,
        alignItems: 'center',
        marginTop: 300,
        textAlign: 'center'
    },
    screen: {
        backgroundColor: styleConstants.backgroundColor,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    authText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: styleConstants.margin
    },
    yahooButton: {
        backgroundColor: styleConstants.secondaryColor,
        color: 'white',
        fontSize: 14,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        marginTop: styleConstants.margin,
        width: '70%',
        borderRadius:5,
        borderWidth: 1,
    }
});

export default ProfileAuthorization;
