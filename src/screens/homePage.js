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
import Tweet from '../components/tweet';
import PlayerStats from "../components/scrollablePlayerList/playerStats";

const HomePage = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center'}} horizontal={false}>
                <Card
                    title={'Hot Free Agents'}
                    children={[<PlayerInfo player={{
                            name: 'Frank Nardone',
                            abbreviatedTeamName: 'NYJ',
                            position: 'RB',
                            picture: 'https://s.yimg.com/iu/api/res/1.2/b0lvZ0mQFE92Uyw4Zsq1Yg--~C/YXBwaWQ9eXNwb3J0cztjaD0yMzM2O2NyPTE7Y3c9MTc5MDtkeD04NTc7ZHk9MDtmaT11bGNyb3A7aD02MDtxPTEwMDt3PTQ2/https://s.yimg.com/xe/i/us/sp/v/nfl_cutout/players_l/08192019/8780.png',
                        }}
                    />,
                    <PlayerInfo player={{
                            name: 'Frank Nardone',
                            abbreviatedTeamName: 'NYJ',
                            position: 'RB',
                            picture: 'https://s.yimg.com/iu/api/res/1.2/b0lvZ0mQFE92Uyw4Zsq1Yg--~C/YXBwaWQ9eXNwb3J0cztjaD0yMzM2O2NyPTE7Y3c9MTc5MDtkeD04NTc7ZHk9MDtmaT11bGNyb3A7aD02MDtxPTEwMDt3PTQ2/https://s.yimg.com/xe/i/us/sp/v/nfl_cutout/players_l/08192019/8780.png',
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
                    children={[<Tweet
                        user={'test'}
                        text={'hi there'}
                        profileImage={'https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg'}
                    />,
                    <Tweet
                        user={'test'}
                        text={'hi there'}
                        profileImage={'https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg'}
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
