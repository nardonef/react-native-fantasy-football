import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    Dimensions, Image, SafeAreaView
} from 'react-native'
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import ErrorText from '../components/errorText';
import styleConstants from '../styles/styleConstants';
import { API, Auth } from 'aws-amplify'
import YahooFantasyAppImage from '../../assets/yahooFantasyAppLogo.png';

const SetLeagueId = (props) => {
    const {userId, username, password} = props.navigation.state.params;
    const [leagueId, setLeagueId] = useState('');

    const submitLeagueId = async () => {
        if (leagueId ==='') {
            return;
        }

        try {
            const apiName = 'RestAPI';
            const path = '/league-id';
            const params = {
                body: {
                    userId: userId,
                    leagueId: leagueId,
                },
            };
            await API.post(apiName, path, params);
            const {navigate} = props.navigation;
            navigate('ProfileAuthorization');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.pageContainer}>
                <Text style={styles.header}>
                    Due to problems with Yahoo you must manually enter your League Id
                </Text>
                <View style={styles.stepsContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.stepText}>
                            1. Open up Yahoo Fantasy App
                        </Text>
                        <Image
                            style={styles.profileImage}
                            source={YahooFantasyAppImage}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.stepText}>
                            2. Choose the league you want to use.
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.stepText}>
                            3. Click on league tab at the bottom.
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.stepText}>
                            4. Click on Settings at the top.
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.stepText}>
                            5. Copy League Id and paste it below.
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <FormTextInput placeholder={'League Id'} onChangeText={setLeagueId}/>
                    </View>
                </View>
                <Text
                    style={styles.logInButton}
                    onPress={submitLeagueId}
                >
                    Submit
                </Text>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    pageContainer: {
        marginLeft: styleConstants.margin,
        marginRight: styleConstants.margin,
        marginBottom: styleConstants.margin,
        marginTop: styleConstants.margin,
        flex: 1,
    },
    stepsContainer: {
        backgroundColor: styleConstants.backgroundColor,
        flex: 1,
        marginTop: styleConstants.largeMargin,
    },
    profileImage: {
        height: 70,
        width: 70,
        marginLeft: styleConstants.margin,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.backgroundColor,
    },
    header: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: styleConstants.largeText,
    },
    stepText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: styleConstants.largeText,
        marginTop: 20,
    }
});

export default SetLeagueId;
