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
import ProfileAuthorization from './screens/ProfileAuthorization'
import Test from './screens/Test';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        SignIn: SignIn,
        ProfileAuthorization: ProfileAuthorization,
        Test: Test,
    },
    {
        initialRouteName: 'SignIn',
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);



// const App = () => {
//   return (
//       <Home/>
//   );
// };
//
// export default App;

