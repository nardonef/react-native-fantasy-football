import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import StyleConsts from "../styles/styleConstants";

const NewsCard = (props) => {
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


    return (
        <TouchableOpacity onPress={props.onClick}>
            <View style={[styles.container, backgroundStyle(props.theme)]}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{uri: props.profileImage}}
                    />
                </View>
                <View>
                    <Text style={[styles.newsTitle, textColorStyle(props.theme)]}>
                      {props.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        flexDirection: 'row',
        height: 70 ,
    },
    newsTitle: {
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    }
});

NewsCard.defaultProps = {
};

export default NewsCard;
