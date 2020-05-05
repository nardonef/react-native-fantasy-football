import React, {useContext, useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import StyleConsts from "../../../styles/styleConstants";
import Picker from 'react-native-wheel-picker'
import {ViewTeamContext} from "../../../screens/viewTeam";
const PickerItem = Picker.Item;

const PositionFilter = (props) => {
    const [viewTeamState, setViewTeamState] = useContext(ViewTeamContext);

    const selectValue = (value) => {
        setViewTeamState({
            ...viewTeamState,
            position: value,
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.close} onPress={props.closeModal}>Close</Text>
            <Picker style={styles.container}
                    selectedValue={viewTeamState.position}
                    itemStyle={{color:"black", fontSize:26}}
                    onValueChange={selectValue}>
                <PickerItem label={'All'} value={'all'} key={"all"}/>
                <PickerItem label={'QB'} value={'QB'} key={"QB"}/>
                <PickerItem label={'RB'} value={'RB'} key={"RB"}/>
                <PickerItem label={'WR'} value={'WR'} key={"WR"}/>
                <PickerItem label={'TE'} value={'TE'} key={"TE"}/>
                <PickerItem label={'K'} value={'K'} key={"K"}/>
                <PickerItem label={'DEF'} value={'DEF'} key={"DEF"}/>
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
