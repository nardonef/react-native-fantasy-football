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

const Tweet = (props) => {
    console.log(props);
    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: props.profileImage}}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.user}>{props.user}</Text>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
};

// const Tweet = (props) => {
//     console.log(props);
//
//     const tweet = <>
//         <View style={styles.profileImageContainer}>
//             <Image
//                 style={styles.profileImage}
//                 source={{uri: props.profileImage}}
//             />
//         </View>
//         <View style={styles.textContainer}>
//             <Text style={styles.user}>{props.user}</Text>
//             <Text style={styles.text}>{props.text}</Text>
//         </View>
//     </>;
//
//     return (
//         <TileContainer component={tweet}/>
//     )
// };

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
    textContainer: {

    },
    container: {
        borderBottomColor: "white",
        borderBottomWidth: 1,
        backgroundColor: "#1b2836",
        alignSelf: "stretch",
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 100,
        flexDirection: 'row'
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
