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
import PlayerInfo from "../components/scrollablePlayerList/playerInfo";
import TileContainer from '../components/tileContainer';

const HomePage = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center'}} horizontal={false}>
                <Card
                    title={'Hot Free Agents'}
                    children={[<TileContainer component={<PlayerInfo player={
                        {
                            name: 'Frank Nardone',
                            abbreviatedTeamName: 'NYJ',
                            position: 'RB'
                        }}
                    />}/>,
                    <PlayerInfo player={
                        {
                            name: 'Frank Nardone',
                            abbreviatedTeamName: 'NYJ',
                            position: 'RB'
                        }}
                    />]}/>
                <Card
                    title={'News'}
                    children={[<PlayerInfo player={
                        {
                            name: 'Frank Nardone',
                            abbreviatedTeamName: 'NYJ',
                            position: 'RB'
                        }}
                    />,
                        <PlayerInfo player={
                            {
                                name: 'Frank Nardone',
                                abbreviatedTeamName: 'NYJ',
                                position: 'RB'
                            }}
                        />]}/>
                <Card
                    title={'Tweets'}
                    children={[<PlayerInfo player={
                        {
                            name: 'Frank Nardone',
                            abbreviatedTeamName: 'NYJ',
                            position: 'RB'
                        }}
                    />,
                        <PlayerInfo player={
                            {
                                name: 'Frank Nardone',
                                abbreviatedTeamName: 'NYJ',
                                position: 'RB'
                            }}
                        />]}/>
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
