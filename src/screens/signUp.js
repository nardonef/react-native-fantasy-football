import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Linking,
    AsyncStorage,
    Text,
    Dimensions, TouchableOpacity,
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
    const [email, setEmail] = useState('');

    const signUp = () => {
        Auth.signUp({
            username: username,
            password: password,
        })
            .then(data => {
                AsyncStorage.setItem('user_sub', data.userSub);
                const {navigate} = props.navigation;
                navigate('SetLeagueId', {
                    userSub: data.userSub,
                    username: username,
                    password: password,
                });
            })
            .catch(err => console.log(err));
    };

    const navigateToSignUp = () => {
        const {navigate} = props.navigation;
        navigate('SignIn');
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <FormTextInput placeholder={'Email'} onChangeText={setEmail}/>
                <FormTextInput placeholder={'UserName'} onChangeText={setUsername}/>
                <FormTextInput placeholder={'Password'} onChangeText={setPassword}/>
                <Text style={styles.signUpButton} onPress={signUp}>
                    Sign Up
                </Text>
                <TouchableOpacity onPress={navigateToSignUp} style={styles.signInTouch}>
                    <View style={styles.signIn}>
                        <Text>Already have an Account? </Text>
                        <Text>Log in!</Text>
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
        marginTop: 450,
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.backgroundColor,
    },
    signUpButton: {
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
    },
    signIn: {
        backgroundColor: styleConstants.backgroundColor,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInTouch: {
        backgroundColor: styleConstants.backgroundColor,
        width: '80%',
        height: 50,
    },
});

export default SignIn;
