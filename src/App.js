/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Twitter from './screens/twitter';
import SetLeagueId from './screens/setLeagueId'
import SignIn from './screens/signIn';
import ProfileAuthorization from './screens/ProfileAuthorization'
import Test from './screens/Test';
import HomeNavigator from './screens/homeNavigator';
import SignUp from './screens/signUp';
import InitialRouter from './screens/initialRouter';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

const AppNavigator = createStackNavigator(
    {
        Twitter: Twitter,
        SetLeagueId: SetLeagueId,
        SignIn: SignIn,
        ProfileAuthorization: ProfileAuthorization,
        Test: Test,
        HomeNavigator: HomeNavigator,
        SignUp: SignUp,
        InitialRouter: InitialRouter,
    },
    {
        initialRouteName: 'SignIn',
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);
