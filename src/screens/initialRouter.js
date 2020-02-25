import React, {useEffect} from 'react'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Dimensions,
} from 'react-native'
import styleConstants from '../styles/styleConstants';

const InitialRouter = (props) => {
    const {navigate} = props.navigation;
console.log('ir')
    const navigateToHome = () => {
        navigate('HomeNavigator');
    };

    const navigateToLandingPage = () => {
        navigate('LandingPage');
    };

    useEffect(() => {
        AsyncStorage.getItem('user_id').then((userId) => {
            if(userId) {
                navigateToHome();
                return;
            }

            navigateToLandingPage();
        });
    }, []);

    return (
        <View style={styles.background}>
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.backgroundColor,
    }
});

export default InitialRouter;
