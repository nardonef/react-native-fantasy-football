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
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import styleConstants from '../styles/styleConstants';
Amplify.configure(awsconfig);

const SignIn = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        Auth.signIn(username, password)
            .then(data => {
                const {navigate} = props.navigation;
                // navigate('ProfileAuthorization', {
                //     username: username
                // });
                navigate('SetLeagueId');
            })
            .catch(err => console.log(err));
    };

    const navigateToSignUp = () => {
        const {navigate} = props.navigation;
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
