import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
} from 'react-native'
import _ from 'lodash';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const SignIn = (props) => {
    console.log('11344g')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //
    // const signUp = () => {
    //     Auth.signUp({
    //         username: username,
    //         password: password,
    //     })
    //         .then(data => {
    //             console.log(data);
    //             const {navigate} = props.navigation;
    //             navigate('ProfileAuthorization', {
    //                 username: username
    //             });
    //         })
    //         .catch(err => console.log(err));
    // };

    const signIn = () => {
        Auth.signIn(username, password)
            .then(data => {
                console.log(data.signInUserSession.accessToken.payload);
                const {navigate} = props.navigation;
                navigate('ProfileAuthorization', {
                    username: username
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <View style={styles.container}>
            <View stle={styles.form}>
                <FormTextInput placeholder={'UserName'} onChangeText={setUsername}/>
                <FormTextInput placeholder={'Password'} onChangeText={setPassword}/>
                <Text style={styles.logInButton} onPress={signIn}>
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
