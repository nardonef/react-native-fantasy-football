import React, {useEffect} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native'
import PropTypes from 'prop-types';
import styleConstants from '../styles/styleConstants';
import {OAuth} from '../Authentication/yahooAuth';

const ProfileAuthorization = (props) => {
    const {navigate} = props.navigation;

    const auth = async () => {
        await OAuth(navigate, 'HomeNavigator');
    };

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.authText}>
                    For the optimal experience authorize access to your team
                    by signing in to your Yahoo account
                </Text>
                <Text style={styles.yahooButton} onPress={auth}>
                    Yahoo
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleConstants.backgroundColor,
        alignItems: 'center',
        marginTop: 300,
        textAlign: 'center'
    },
    screen: {
        backgroundColor: styleConstants.backgroundColor,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    authText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: styleConstants.margin
    },
    yahooButton: {
        backgroundColor: styleConstants.secondaryColor,
        color: 'white',
        fontSize: 14,
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        marginTop: styleConstants.margin,
        width: '70%',
        borderRadius:5,
        borderWidth: 1,
    }
});

export default ProfileAuthorization;
