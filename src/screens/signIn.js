import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
} from 'react-native'
import qs from 'qs';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import yahooConfig from './../../yahooConfig';
import Amplify, { Auth } from 'aws-amplify';
import { Base64 } from 'js-base64';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const SignIn = (props) => {

    const [token, setToken] = useState('');

    const getToken =(codeOrToken, tokenType) => {
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
                // AsyncStorage.setItem(REFRESH_TOKEN, token.refresh_token);

                setToken(token);
            }
        }).catch(err => console.error('1Error fetching token', err));
    };

    const getProfileData = (tokenData) => {
        const dataurl = `https://social.yahooapis.com/v1/user/${tokenData.xoauth_yahoo_guid}/profile?format=json`;
        fetch(dataurl, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`
            }
        }).then(res => {
            return res.json();
        }).then(profileData => {
            console.log(`User profile: ${JSON.stringify(profileData)}`);

            this.setState({
                profile: {
                    imageUrl: profileData.profile.image.imageUrl,
                    nickname: profileData.profile.nickname,
                }
            });
        }).catch(err => console.error('Error fetching profile data', err));
    };

    const signUp = () => {
        // Auth.signUp({
        //     username: 'testUser1',
        //     password: 'nardone5',
        //     attributes: {
        //         email: 'fnsuperman5@gmail.com',
        //     },
        //     // validationData: []  //optional
        // })
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));
        const {navigate} = props.navigation;
        navigate('Home')

    };

    useEffect(() => {
        const OAuth = async () => {
            // const refresh_token = await AsyncStorage.getItem('test');
            // console.log(`refresh_token in OAuth: ${refresh_token}`);
            // if (refresh_token !== null) {
            //     console.log('Found refresh_token');
            //     // Get access_token
            //     getToken(refresh_token, 'refresh_token');
            // }
            // console.log('No refresh_token stored yet');
            // for secure authorization
            // const state = Math.random() + '';
            // setAuthState(state);

            const oauthurl = 'https://api.login.yahoo.com/oauth2/request_auth?' +
                qs.stringify({
                    client_id: yahooConfig.client_id,
                    response_type: 'code',
                    redirect_uri: yahooConfig.redirect_uri,
                    // state: state,
                });
            console.log(oauthurl);

            Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));

            // Listen to redirection
            function handleUrl(event) {
                // Get access_token
                console.log(event.url);
                Linking.removeEventListener('url', handleUrl);
                const [, query_string] = event.url.match(/\?(.*)/);
                console.log(query_string);

                const query = qs.parse(query_string);
                console.log(`query: ${JSON.stringify(query)}`);

                // if (query.state === state) {
                getToken(query.code, 'access_token');
                // } else {
                //     console.error('Error authorizing oauth redirection');
                // }
            }

            Linking.addEventListener('url', handleUrl);

        };
        OAuth()
    }, []);

    return (
        <View style={styles.container}>
            <View stle={styles.form}>
                <FormTextInput placeholder={'UserName'}/>
                <FormTextInput placeholder={'Password'}/>
                <Text style={styles.logInButton} onPress={signUp}>
                    Login
                </Text>
                <View style={styles.signUpContainer}>
                    <Text>New User?</Text>
                    <Text>Sign Up!</Text>
                </View>
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
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 300,

    },
    form: {
        marginTop: 300,
        flex: 1,
        justifyContent: 'center',
        width: '80%'
    },
    logInButton: {
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 1,
        color: 'white',
        fontSize: 14,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        marginTop: 20,
    },
});

export default SignIn;
