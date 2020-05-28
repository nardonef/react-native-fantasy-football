import React, {useContext, useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import StyleConsts from "../../styles/styleConstants";
import Picker from 'react-native-wheel-picker'
import {ViewTeamContext} from "../../screens/viewTeam";
const PickerItem = Picker.Item;

const SeasonFilter = (props) => {
    const [viewTeamState, setViewTeamState] = useContext(ViewTeamContext);

    const selectValue = (value) => {
        setViewTeamState({
            ...viewTeamState,
            week: value,
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.close} onPress={props.closeModal}>Close</Text>
            <Picker style={styles.container}
                    selectedValue={viewTeamState.week}
                    itemStyle={{color:"black", fontSize:26}}
                    onValueChange={selectValue}>
                <PickerItem label={'All Season'} value={'0'} key={"AllSeason"}/>
                <PickerItem label={'Week 1'} value={'1'} key={"Week1"}/>
                <PickerItem label={'Week 2'} value={'2'} key={"Week2"}/>
                <PickerItem label={'Week 3'} value={'3'} key={"Week3"}/>
                <PickerItem label={'Week 4'} value={'4'} key={"Week4"}/>
                <PickerItem label={'Week 5'} value={'5'} key={"Week5"}/>
                <PickerItem label={'Week 6'} value={'6'} key={"Week6"}/>
                <PickerItem label={'Week 7'} value={'7'} key={"Week7"}/>
                <PickerItem label={'Week 8'} value={'8'} key={"Week8"}/>
                <PickerItem label={'Week 9'} value={'9'} key={"Week9"}/>
                <PickerItem label={'Week 10'} value={'10'} key={"Week10"}/>
                <PickerItem label={'Week 11'} value={'11'} key={"Week11"}/>
                <PickerItem label={'Week 12'} value={'12'} key={"Week12"}/>
                <PickerItem label={'Week 13'} value={'13'} key={"Week13"}/>
                <PickerItem label={'Week 14'} value={'14'} key={"Week14"}/>
                <PickerItem label={'Week 15'} value={'15'} key={"Week15"}/>
                <PickerItem label={'Week 16'} value={'16'} key={"Week16"}/>
                <PickerItem label={'Week 17'} value={'17'} key={"Week17"}/>
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
