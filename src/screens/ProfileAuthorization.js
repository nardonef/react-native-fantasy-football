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

const ProfileAuthorization = (props) => {
    const [token, setToken] = useState('');
    const REFRESH_TOKEN = 'refresh_token';

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
                AsyncStorage.setItem(REFRESH_TOKEN, token.refresh_token);

                setToken(token);
                const {navigate} = props.navigation;
                navigate('Test', token)
            }
        }).catch(err => console.error('1Error fetching token', err));
    };

    const OAuth = async () => {
        const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN);
        console.log(`refresh_token in OAuth: ${refresh_token}`);
        if (refresh_token !== null) {
            console.log('Found refresh_token');
            // Get access_token
            getToken(refresh_token, 'refresh_token');
            return;
        }

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

    console.log(props.navigation.state.params.username);
    return (
        <View style={styles.container}>
            <Button title={'Yahoo'} onPress={OAuth}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 300,

    },
});

export default ProfileAuthorization;
