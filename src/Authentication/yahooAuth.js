import yahooConfig from "../../yahooConfig";
import {Base64} from "js-base64";
import {AsyncStorage, Linking} from "react-native";
import qs from "qs";
import {API} from 'aws-amplify';

const REFRESH_TOKEN = 'refresh_token';

const getToken = async (codeOrToken, tokenType) => {
    let bodyJson;
    switch(tokenType){
        case 'access_token':
            bodyJson = {
                client_id: yahooConfig.client_id,
                client_secret: yahooConfig.client_secret,
                redirect_uri: yahooConfig.redirect_uri,
                code: codeOrToken,
                grant_type: 'authorization_code',
            };
            break;
        case 'refresh_token':
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

    let token = null;
    try {
        const response = await fetch(tokenurl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${authcode}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(bodyJson).toString(),
        });

        token = await response.json();
    } catch (e) {
        throw new Error('Error getting token');
    }

    if (token.error || !token.refresh_token) {
        throw new Error('No token');
    }

    return token;
};

const storeTokens = async (token) => {
    AsyncStorage.setItem(REFRESH_TOKEN, token.refresh_token);
    const userId = await AsyncStorage.getItem('user_id');
    const apiName = 'RestAPI';
    const path = '/access-key';
    const params = {
        body: {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            userId: userId
        },
    };
    await API.post(apiName, path, params);
}

export const OAuth = async (navigator, navigationDestination) => {
    const oauthurl = 'https://api.login.yahoo.com/oauth2/request_auth?' +
        qs.stringify({
            client_id: yahooConfig.client_id,
            response_type: 'code',
            redirect_uri: yahooConfig.redirect_uri,
            // state: state,
        });

    Linking.openURL(oauthurl).catch(err => console.error('Error processing linking', err));

    // Listen to redirection
    async function handleUrl(event) {
        // Get access_token
        Linking.removeEventListener('url', handleUrl);
        const [, query_string] = event.url.match(/\?(.*)/);

        const query = qs.parse(query_string);

        try {
            const token = await getToken(query.code, 'access_token');
            await storeTokens(token);
            navigator(navigationDestination, {access_token: token.access_token});
        } catch (e) {
            console.log('oauth: ' + e);
        }

        // if (query.state === state) {
        // } else {
        //     console.error('Error authorizing oauth redirection');
        // }
    }

    Linking.addEventListener('url', handleUrl);
};

export const checkForRefreshToken = async () => {
    const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN);
    if (!refresh_token) {
        throw new Error('No refresh token');
    }

    const token = await getToken(refresh_token, 'refresh_token');
    await storeTokens(token);
    // TODO remove
    return token;
};
