import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'

const SeasonFilter = (props) => {
    const [pickerValue, setPickerValue] = useState('Total');

    return (
        <View style={styles.container}>
            <Text style={styles.close} onPress={props.closeModal}>Close</Text>
            <Picker style={styles.container}
                    selectedValue={pickerValue}
                    itemStyle={{color:"black", fontSize:26}}
                    onValueChange={(value) => setPickerValue(value)}>
                <PickerItem label={'Total'} value={'Total'} key={"Total"}/>
                <PickerItem label={'Percentage'} value={'Percentage'} key={"Percentage"}/>
                <PickerItem label={'Ranking'} value={'Ranking'} key={"Ranking"}/>
            </Picker>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '80%',
        borderRadius: 15,
    }
});

export default SeasonFilter;
