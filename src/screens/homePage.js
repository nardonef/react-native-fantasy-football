import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    View
} from 'react-native'
import _ from 'lodash';
import StyleConsts from "../styles/styleConstants";
import Card from '../components/card';


const HomePage = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center'}} horizontal={false}>
                <Card title={'Hot Free Agents'}/>
                <Card title={'News'}/>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: StyleConsts.tweetsColor,
    },
    scrollView: {
        width: '100%',
        height: '100%',
    }
});

export default HomePage;
