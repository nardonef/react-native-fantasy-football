/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Home from './screens/home';
import SignIn from './screens/signIn';
import { Navigation } from 'react-native-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
    Home: {
        screen: SignIn,
    },
});

// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => SignIn);
//
//
// const App = () => {
//   return (
//       <Home/>
//   );
// };
//
// export default App;

export default createAppContainer(AppNavigator);
