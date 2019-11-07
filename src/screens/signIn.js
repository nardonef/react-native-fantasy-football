import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Button,
    Text,
} from 'react-native'
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const SignIn = (props) => {

    const signUp = () => {
        Auth.signUp({
            username: 'testUser1',
            password: 'nardone5',
            attributes: {
                email: 'fnsuperman5@gmail.com',
            },
            // validationData: []  //optional
        })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    };

    return (
        <View style={styles.container}>
            <View stle={styles.form}>
                <FormTextInput placeholder={'UserName'}/>
                <FormTextInput placeholder={'Password'}/>
                <Button title={'Sign Up!'} onPress={signUp}/>
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
    }
});

export default SignIn;
