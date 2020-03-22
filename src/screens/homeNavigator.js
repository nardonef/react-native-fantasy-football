import React from "react";
import { Text } from "react-native";
import Tweets from './twitter';
import ViewTeam from './viewTeam';
import styleConstants from '../styles/styleConstants';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

const headerMenuIcon = <EntypoIcon name="menu" size={35} color={'white'} />;

const ViewTeamScreen = createStackNavigator(
    {
        Tab1: {
            screen: ViewTeam,
            navigationOptions: {
                headerRight: headerMenuIcon,
                headerStyle: {
                    backgroundColor: styleConstants.tweetsColor,
                    height: 40,
                    borderBottomWidth: 0,
                    marginRight: 10,
                },
            }
        }
    }
);

const TweetsScreen = createStackNavigator(
    {
        Tab2: {
            screen: Tweets,
            navigationOptions: {
                headerRight: headerMenuIcon,
                headerStyle: {
                    backgroundColor: styleConstants.tweetsColor,
                    height: 40,
                    borderBottomWidth: 0,
                    marginRight: 10,
                },
            }
        }
    }
);

const DashboardTabRoutes = createMaterialBottomTabNavigator(
    {
        Tab1: {
            screen: ViewTeamScreen,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (<AntDesignIcon name="team" size={20} color={'white'}/>),
            }
        },
        Tab2: {
            screen: TweetsScreen,
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
