import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import StyleConsts from "../../styles/styleConstants";
import Picker from 'react-native-wheel-picker'
const PickerItem = Picker.Item;

const PositionFilter = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.close} onPress={props.closeModal}>Close</Text>
            <Picker style={styles.container}
                    selectedValue={props.graph}
                    itemStyle={{color:"black", fontSize:26}}
                    onValueChange={props.setGraph}
            >
                {props.options.map((option) => <PickerItem label={`Weekly ${option}`} value={option} key={option}/>)}
            </Picker>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '30%',
        borderRadius: 15,
    },
    close: {
        marginLeft: StyleConsts.margin,
        marginTop: StyleConsts.margin
    }
});

export default PositionFilter;
