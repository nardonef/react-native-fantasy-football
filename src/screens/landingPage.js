import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Linking,
    AsyncStorage,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import Button from '../components/button';
import awsconfig from '../../aws-exports';
import styleConstants from '../styles/styleConstants';
import Test from "./Test";
Amplify.configure(awsconfig);

const LandingPage = (props) => {
    const {navigate} = props.navigation;

    const navigateToSignUp = () => {
        navigate('SignUp');
    };

    const navigateToSignIn = () => {
        navigate('SignIn');
    };

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>
                    Fantasy App
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button style={styles.signInButton} title={'Sign In'} onPress={navigateToSignIn}/>
                <Button style={styles.signUpButton} title={'Sign Up'} onPress={navigateToSignUp}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: styleConstants.backgroundColor,
        alignItems: 'center',
        paddingTop: 300
    },
    logoContainer: {
        backgroundColor: styleConstants.backgroundColor,
        alignItems: 'center',
        paddingTop: 200
    },
    logo: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.backgroundColor,
    },
    signInButton: {
        borderRadius: 20,
    },
    signUpButton: {
        marginTop: 20,
        borderRadius: 20,
    }
});

export default LandingPage;
