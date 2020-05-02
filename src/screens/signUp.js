import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    Dimensions, TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types';
import Button from '../components/button';
import FormTextInput from '../components/FormTextInput';
import { Auth } from 'aws-amplify';
import styleConstants from '../styles/styleConstants';

const SignUp = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const signUp = () => {
        Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email,
            },
        })
            .then(data => {
                AsyncStorage.setItem('user_id', data.userSub);
                const {navigate} = props.navigation;
                Auth.signIn(username, password).then(() => {
                    navigate('SetLeagueId', {
                        userId: data.userSub,
                        username: username,
                        password: password,
                    });
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
                <Button title={'Sign Up'} style={styles.signUpButton} onPress={signUp}/>
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

export default SignUp;
