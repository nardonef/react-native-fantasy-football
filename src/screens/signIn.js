import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import Button from '../components/button';
import FormTextInput from '../components/FormTextInput';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import {getUser} from '../graphql/queries'
import awsconfig from '../../aws-exports';
import styleConstants from '../styles/styleConstants';
import {checkForRefreshToken} from '../Authentication/yahooAuth';
Amplify.configure(awsconfig);

const SignIn = (props) => {
    const {navigate} = props.navigation;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            const userData = await Auth.signIn(username, password);
            const userId = _.get(userData, 'attributes.sub', null);
            AsyncStorage.setItem('user_id', userId);
            const apiData = await API.graphql(graphqlOperation(getUser, {id: userId}));
            const leagueId = _.get(apiData, 'data.getUser.leagueId', null);

            if (!leagueId) {
                navigate('SetLeagueId', {
                    userSub: userId
                });
            }

            AsyncStorage.setItem('league_id', leagueId);
            const token = await checkForRefreshToken();
            navigate('HomeNavigator', {access_token: token.access_token})
        } catch (e) {
            if (e.message === 'No refresh token') {
                navigate('ProfileAuthorization');
            }
        }
    };

    const navigateToSignUp = () => {
        navigate('SignUp');
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <FormTextInput placeholder={'Username'} onChangeText={setUsername}/>
                <FormTextInput placeholder={'Password'} onChangeText={setPassword}/>
                <Button title={'Sign In'} style={styles.logInButton} onPress={signIn}/>
                <TouchableOpacity onPress={navigateToSignUp} style={styles.signUpTouch}>
                    <View style={styles.signUp}>
                        <Text>New User? </Text>
                        <Text>Sign Up!</Text>
                    </View>
                </TouchableOpacity>
                <Button title={'clear AsyncStorage'} onPress={() => AsyncStorage.clear(()=>{})}/>
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
