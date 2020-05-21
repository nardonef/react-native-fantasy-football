import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types';
import TileContainer from "./tileContainer";
import StyleConsts from "../styles/styleConstants";

const Tweet = (props) => {
    console.log(props);

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
    return (
        <View style={[styles.container, backgroundStyle(props.theme)]}>
            <View style={styles.profileImageContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: props.profileImage}}
                />
            </View>
            <View>
                <Text style={[styles.user, textColorStyle(props.theme)]}>{props.user}</Text>
                <Text style={[styles.text, textColorStyle(props.theme)]}>{props.text}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    profileImage: {
        height: 50,
        width: 50,
        borderRadius:40,
    },
    profileImageContainer: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    container: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        backgroundColor: "#1b2836",
        alignSelf: "stretch",
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 100,
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        // paddingLeft: 50,
    },
    user: {
        fontWeight: 'bold',
        color: 'white',
        // paddingLeft: 50,
        paddingBottom: 5,
    }
});

export default Tweet;
