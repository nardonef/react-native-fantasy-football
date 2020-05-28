import React from 'react'
import {StyleSheet, View} from 'react-native'
import StyleConsts from '../../styles/styleConstants'
import Attribute from './attribute';

const PlayerAttributes = (props) => {
    return (
        <View style={styles.container}>
            <Attribute label={'Bye'} stat={17}/>
            <Attribute label={'Age'} stat={props.age}/>
            <Attribute label={'Weight'} stat={props.weight}/>
            <Attribute label={'Height'} stat={props.height}/>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        backgroundColor: StyleConsts.tweetsColor,
        flexDirection: 'row',
        height:70,
        flex: 1,
        paddingRight: 9,
    }
});

export default PlayerAttributes;
