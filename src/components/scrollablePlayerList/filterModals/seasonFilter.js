import React, {useState} from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import FilterOption from './filterOption';

const SeasonFilter = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const filterOnClick = () => {
        console.log('clicked')
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <FilterOption text={'Full Season'} handleSelect={() => {}}/>
            <FilterOption text={'Week 1'} handleSelect={() => {}}/>
            <FilterOption text={'Week 2'} handleSelect={() => {}}/>
            <FilterOption text={'Week 3'} handleSelect={() => {}}/>
            <FilterOption text={'Week 4'} handleSelect={() => {}}/>
            <FilterOption text={'Week 5'} handleSelect={() => {}}/>
            <FilterOption text={'Week 6'} handleSelect={() => {}}/>
            <FilterOption text={'Week 7'} handleSelect={() => {}}/>
            <FilterOption text={'Week 8'} handleSelect={() => {}}/>
            <FilterOption text={'Week 9'} handleSelect={() => {}}/>
            <FilterOption text={'Week 10'} handleSelect={() => {}}/>
            <FilterOption text={'Week 11'} handleSelect={() => {}}/>
            <FilterOption text={'Week 12'} handleSelect={() => {}}/>
            <FilterOption text={'Week 13'} handleSelect={() => {}}/>
            <FilterOption text={'Week 14'} handleSelect={() => {}}/>
            <FilterOption text={'Week 15'} handleSelect={() => {}}/>
            <FilterOption text={'Week 16'} handleSelect={() => {}}/>
            <FilterOption text={'Week 17'} handleSelect={() => {}}/>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 200,
        borderRadius: 15,
    }
});

export default SeasonFilter;
