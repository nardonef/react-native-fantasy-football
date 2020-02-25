import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Tweets from './twitter';
import Test from './Test';
import ViewTeam from './viewTeam';

export default createMaterialBottomTabNavigator(
    {
        Home: { screen: ViewTeam },
        Tweets: { screen: Tweets },
    },
    {
        initialRouteName: 'Home',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: { backgroundColor: '#694fad' },
    }
);
