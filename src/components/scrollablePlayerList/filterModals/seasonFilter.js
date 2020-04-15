import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import StyleConsts from "../../../styles/styleConstants";
import Picker from 'react-native-wheel-picker'
const PickerItem = Picker.Item;

const SeasonFilter = (props) => {
    const [pickerValue, setPickerValue] = useState('All_Season');

    return (
        <View style={styles.container}>
            <Text style={styles.close} onPress={props.closeModal}>Close</Text>
            <Picker style={styles.container}
                    selectedValue={pickerValue}
                    itemStyle={{color:"black", fontSize:26}}
                    onValueChange={(value) => setPickerValue(value)}>
                <PickerItem label={'All Season'} value={'All_Season'} key={"AllSeason"}/>
                <PickerItem label={'Week 1'} value={'Week_1'} key={"Week1"}/>
                <PickerItem label={'Week 2'} value={'Week_2'} key={"Week2"}/>
                <PickerItem label={'Week 3'} value={'Week_3'} key={"Week3"}/>
                <PickerItem label={'Week 4'} value={'Week_4'} key={"Week4"}/>
                <PickerItem label={'Week 5'} value={'Week_5'} key={"Week5"}/>
                <PickerItem label={'Week 6'} value={'Week_6'} key={"Week6"}/>
                <PickerItem label={'Week 7'} value={'Week_7'} key={"Week7"}/>
                <PickerItem label={'Week 8'} value={'Week_8'} key={"Week8"}/>
                <PickerItem label={'Week 9'} value={'Week_9'} key={"Week9"}/>
                <PickerItem label={'Week 10'} value={'Week_10'} key={"Week10"}/>
                <PickerItem label={'Week 11'} value={'Week_11'} key={"Week11"}/>
                <PickerItem label={'Week 12'} value={'Week_12'} key={"Week12"}/>
                <PickerItem label={'Week 13'} value={'Week_13'} key={"Week13"}/>
                <PickerItem label={'Week 14'} value={'Week_14'} key={"Week14"}/>
                <PickerItem label={'Week 15'} value={'Week_15'} key={"Week15"}/>
                <PickerItem label={'Week 16'} value={'Week_16'} key={"Week16"}/>
                <PickerItem label={'Week 17'} value={'Week_17'} key={"Week17"}/>
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

export default SeasonFilter;
