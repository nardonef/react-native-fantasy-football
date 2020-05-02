import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import styleConstants from '../styles/styleConstants';
import Icon from "react-native-vector-icons/FontAwesome5";

const TeamScrollerHeader = (props) => {
    const screenNames = ['Your Team','Wavier Wire'];
    const screens = ['ViewTeamScreen', 'ViewWaiverWireScreen'];

    const [currentScreen, setCurrentScreen] = useState(0);

    useEffect(() => {
        props.navigation.navigate(screens[currentScreen]);
    }, [currentScreen]);

    const handleLeftPress = () => {
        if (currentScreen === 0) {
            return;
        }

        setCurrentScreen(currentScreen-1)
    };

    const handleRightPress = () => {
        if (currentScreen === 1) {
            return;
        }

        setCurrentScreen(currentScreen+1)
    };

    return (
        <View style={[styles.container, props.style]}>
            <Icon
                onPress={handleLeftPress}
                name="caret-left"
                size={30}
                color={'white'}
            />
            <Text style={styles.screenName}>{screenNames[currentScreen]}</Text>
            <Icon
                onPress={handleRightPress}
                name="caret-right"
                size={30}
                color={'white'}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: styleConstants.tweetsColor,
        flex: 0.8,
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    screenName: {
        fontSize: 18,
        color: 'white',
    }
});

export default TeamScrollerHeader;
