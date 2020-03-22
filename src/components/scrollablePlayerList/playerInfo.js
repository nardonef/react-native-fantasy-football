import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

const PlayerInfo = (props) => {
    const buildName = () => {
        if (!props.player.name) {
            return null;
        }

        const nameArray = props.player.name.split(' ');

        return `${nameArray[0].charAt(0)}. ${nameArray[1]}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: props.player.picture}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{buildName()}</Text>
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
        paddingLeft: 10,
        paddingTop: 5,
    },
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        backgroundColor: "#1b2836",
        flexDirection: 'row',
        height: 60 ,
        paddingTop: 5,
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
        paddingLeft: 10,
        paddingRight: 10,
    }
});

export default PlayerInfo;
