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
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        SignIn: SignIn,
    },
    {
        initialRouteName: 'SignIn',
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

