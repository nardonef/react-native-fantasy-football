import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'
import StyleConsts from "../../styles/styleConstants";

const PlayerInfo = (props) => {
    const buildName = () => {
        if (!props.player.name) {
            return null;
        }

        const nameArray = props.player.name.split(' ');

        return `${nameArray[0].charAt(0)}. ${nameArray[1]}`;
    };

    const backgroundStyle = (theme) => {
        if (theme === 'dark') {
            return {
                backgroundColor: StyleConsts.tweetsColor,
                borderBottomColor: "white",
            }
        }

        return {
            backgroundColor: 'white',
            borderBottomColor: StyleConsts.tweetsColor,
        }
    };

    const textColorStyle = (theme) => {
        if (theme === 'dark') {
            return {
                color: 'white',
            }
        }

        return {
            color: StyleConsts.tweetsColor,
        }
    };

    const renderPosition = (position) => {
        if (position === 'W/R/T') {
            return 'FLEX';
        }
        return position
    };

    return (
        <View style={[styles.container, backgroundStyle(props.theme)]}>
            <View style={styles.profileImageContainer}>
                <View style={styles.fantasyRosterPosition}>
                    <Text style={styles.fantasyRosterPositionText}>
                        {renderPosition(props.player.fantasyRosterPosition)}
                    </Text>
                </View>
                <Image
                    style={styles.profileImage}
                    source={{uri: props.player.picture}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.name, textColorStyle(props.theme)]}>
                    {buildName()}
                </Text>
                <View style={styles.bottomSection}>
                    <Text style={[styles.bottomSectionText, textColorStyle(props.theme)]}>
                        {props.player.abbreviatedTeamName}
                    </Text>
                    <Text style={[styles.bottomSectionText, textColorStyle(props.theme)]}>
                        {props.player.position}
                    </Text>
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
        paddingLeft: 1,
        paddingTop: 13,
    },
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        flexDirection: 'row',
        height: 70 ,
    },
    name: {
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 5,
    },
    profileImage: {
        height: 50,
        width: 45,
        borderRadius:40,
    },
    profileImageContainer: {
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fantasyRosterPosition: {
        width: 40,
        textAlign: 'center',
        alignItems: 'center',
    },
    fantasyRosterPositionText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 12,
    }
});

PlayerInfo.defaultProps = {
    player: {
        name: '',
        picture: '',
        abbreviatedTeamName: '',
        position: '',
    },
    theme: 'light',
};

export default PlayerInfo;
