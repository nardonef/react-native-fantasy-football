import React from "react";
import Tweets from './twitter';
import ViewTeam from './viewTeam';
import styleConstants from '../styles/styleConstants';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import EntypoIcon from "react-native-vector-icons/Entypo";
import ViewWaiverWire from './viewWaiverWire';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Header from '../components/header';
import TeamScrollerHeader from '../components/teamScrollerHeader'
import HomePage from '../screens/homePage'


const ViewPlayersStackView = createStackNavigator(
    {
        ViewTeamScreen:  ViewTeam,
        ViewWaiverWireScreen: ViewWaiverWire
    }, {
        initialRouteName: 'ViewTeamScreen',
        defaultNavigationOptions: ({ navigation }) => ({
            header:<Header
                navigation={navigation}
                centerComponent={<TeamScrollerHeader navigation={navigation}/>}
            />,
        }),
    });

const TweetsScreen = createStackNavigator(
    {
        Tweets: {
            screen: Tweets,
            navigationOptions: {
                header: <Header/>,
            }
        }
    },
    {
        initialRouteName: 'Tweets',
    }
);

const HomeScreen = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                header: <Header/>,
            }
        }
    },
    {
        initialRouteName: 'HomePage',
    }
);

const DashboardTabRoutes = createMaterialBottomTabNavigator(
    {
        Tab1: {
            screen: ViewPlayersStackView,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (<AntDesignIcon name="team" size={20} color={'white'}/>),
            }
        },
        Tab2: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (<EntypoIcon name="home" size={20} color={'white'}/>),
            }
        },
        Tab3: {
            screen: TweetsScreen,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (<EntypoIcon name="twitter" size={20} color={'white'}/>),
            }
        },
    },
    {
        initialRouteName: "Tab1",
        barStyle: {
            backgroundColor: styleConstants.backgroundColor,
            height: 50
        }
    }
);

export default DashboardTabRoutes;
