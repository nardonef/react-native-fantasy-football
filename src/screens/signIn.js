import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import {getUser} from '../graphql/queries'
import awsconfig from '../../aws-exports';
import styleConstants from '../styles/styleConstants';
import yahooConfig from "../../yahooConfig";
import {Base64} from "js-base64";
Amplify.configure(awsconfig);

const SignIn = (props) => {
    const {navigate} = props.navigation;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            const userData = await Auth.signIn(username, password);
            const userId = _.get(userData, 'attributes.sub', null);
            const apiData = await API.graphql(graphqlOperation(getUser, {id: userId}));
            const leagueId = _.get(apiData, 'data.getUser.leagueId', null);

            if (!leagueId) {
                navigate('SetLeagueId', {
                    userSub: userId
                });
            }

            AsyncStorage.setItem('league_id', leagueId);
            await checkForRefreshToken();
        } catch (e) {
            console.log(e);
            if (e.message === 'No refresh token') {
                navigate('ProfileAuthorization');
            }
        }
    };

    const checkForRefreshToken = async () => {
        const refresh_token = await AsyncStorage.getItem('refresh_token');
        if (!refresh_token) {
            throw new Error('No refresh token');
        }

        getToken(refresh_token, 'refresh_token');
    };

    const getToken = (codeOrToken, tokenType) => {
        let bodyJson;
        switch(tokenType){
            case 'access_token':
                console.log(`code: ${codeOrToken}`);
                bodyJson = {
                    client_id: yahooConfig.client_id,
                    client_secret: yahooConfig.client_secret,
                    redirect_uri: yahooConfig.redirect_uri,
                    code: codeOrToken,
                    grant_type: 'authorization_code',
                };
                break;
            case 'refresh_token':
                console.log(`refresh_token: ${codeOrToken}`);
                bodyJson = {
                    client_id: yahooConfig.client_id,
                    client_secret: yahooConfig.client_secret,
                    redirect_uri: yahooConfig.redirect_uri,
                    refresh_token: codeOrToken,
                    grant_type: 'refresh_token',
                };
                break;
            default:
                console.error('Unidentified token type');
        }

        const tokenurl = `https://api.login.yahoo.com/oauth2/get_token`;
        const authcode = Base64.encode(`${yahooConfig.client_id}:${yahooConfig.client_secret}`);

        fetch(tokenurl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${authcode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(bodyJson).toString(),
        }).then((res) => res.json()
        ).then((token) => {
            console.log(token);

            if (token.error) {
                console.error('ERROR GETTING TOKEN')
            }

            if (token.refresh_token) {
                // // store refresh_token
                AsyncStorage.setItem('refresh_token', token.refresh_token);
                const {navigate} = props.navigation;
                navigate('HomeNavigator', token)
            }
        }).catch(err => console.error('Error fetching token', err));
    };

    const navigateToSignUp = () => {
        navigate('SignUp');
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <FormTextInput placeholder={'Username'} onChangeText={setUsername}/>
                <FormTextInput placeholder={'Password'} onChangeText={setPassword}/>
                <Text style={styles.logInButton} onPress={signIn}>
                    Log In
                </Text>
                <TouchableOpacity onPress={navigateToSignUp} style={styles.signUpTouch}>
                    <View style={styles.signUp}>
                        <Text>New User? </Text>
                        <Text>Sign Up!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: styleConstants.backgroundColor,
        alignItems: 'center',
        marginTop: '100%',
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.backgroundColor,
    },
    logInButton: {
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
        height: 42,
    },
    signUpTouch: {
        backgroundColor: styleConstants.backgroundColor,
        width: '80%',
        height: 50,
    },
    signUp: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignIn;
