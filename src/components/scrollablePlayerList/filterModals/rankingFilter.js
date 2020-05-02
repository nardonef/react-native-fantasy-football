import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import StyleConsts from "../../../styles/styleConstants";
import Picker from 'react-native-wheel-picker'
const PickerItem = Picker.Item;

const RankingFilter = (props) => {
    const [pickerValue, setPickerValue] = useState('League_Rank');

    return (
        <View style={styles.container}>
            <Text style={styles.close} onPress={props.closeModal}>Close</Text>
            <Picker style={styles.container}
                    selectedValue={pickerValue}
                    itemStyle={{color:"black", fontSize:26}}
                    onValueChange={(value) => setPickerValue(value)}>
                <PickerItem label={'League Rank'} value={'League_Rank'} key={"LeagueRank"}/>
                <PickerItem label={'Team Rank'} value={'Team_Rank'} key={"TeamRank"}/>
                <PickerItem label={'Position Rank'} value={'Position_Rank'} key={"PositionRank"}/>
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

export default RankingFilter;
