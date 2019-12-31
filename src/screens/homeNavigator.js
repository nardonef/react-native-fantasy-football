import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Tweets from './twitter';
import Test from './Test';

export default createMaterialBottomTabNavigator(
    {
        Home: { screen: Test },
        Tweets: { screen: Tweets },
    },
    {
        initialRouteName: 'Home',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: { backgroundColor: '#694fad' },
    }
);
