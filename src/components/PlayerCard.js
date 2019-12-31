import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import PropTypes from 'prop-types';

const PlayerCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: props.player.picture}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{props.player.name}</Text>
                <View style={styles.bottomSection}>
                    <Text style={styles.bottomSectionText}>{props.player.abbreviatedTeamName}</Text>
                    <Text style={styles.bottomSectionText}>{props.player.position}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    bottomSection: {
        flex: 1,
        flexDirection: 'row'
    },
    bottomSectionText: {
        color: 'white',
        fontSize: 10,
        marginBottom: 5,
        marginRight: 3,
    },
    textContainer: {
        paddingLeft: 15,
    },
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        backgroundColor: "#1b2836",
        alignSelf: "stretch",
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 100,
        flexDirection: 'row'
    },
    name: {
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 5,
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius:40,
    },
    profileImageContainer: {
        paddingLeft: 15,
        paddingRight: 15,
    }
});

export default PlayerCard;
