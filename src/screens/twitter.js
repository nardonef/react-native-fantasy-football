import React from 'react';
import {Text, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import Tweet from '../components/tweet';
import PTRView from 'react-native-pull-to-refresh';
import styleConstants from '../styles/styleConstants';

class HomeScreen extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            tweets: [],
            error: false,
        };
        this.refresh = this.refresh.bind(this);
    }

    async componentDidMount() {
        await this.getTweets();
    }

    renderTweets() {
        if (!this.state.tweets) {
            return;
        }

        return this.state.tweets.map(tweet => {
            return <Tweet text={tweet.text} user={tweet.user} profileImage={tweet.profile_image}/>
        })
    }

    refresh() {
        return new Promise((resolve) => {
            this.getTweets().then(resolve);
        });
    }

    async getTweets() {
        // const response = await fetch('http://localhost:3000/tweets').catch(console.log);
        // const tweets = await response.json().catch(console.log);
        const tweets = [{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @RobDemovsky: Ezekiel Elliott is the last person the Packers want to see right now.\n\nOr maybe this is where the Packers’ run defense cou…","created_at":1569935554000,"id":1179021285592113200},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"@FieldYates Your wife will be too busy to leave you.","created_at":1569942372000,"id":1179049881559867400},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @mortreport: Love this wonderful friend https://t.co/FqoqYZ4Gnl","created_at":1569946664000,"id":1179067885244878800},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Panthers placed DE Kawann Short on injured reserve with a shoulder injury.","created_at":1569947981000,"id":1179073409545855000},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Giants activated WR Golden Tate and signed LB Josiah Tauaefa off their practice squad. To make room, they released… https://t.co/AZUxTcPSOY","created_at":1569951092000,"id":1179086456767352800},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @Melvingordon25: I've been getting a lot of questions about the Holdout, but this video from @DrSquatchSoapCo should explain things:\nhtt…","created_at":1569970473000,"id":1179167746526994400},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"🏈 Steve Young calls it \"a wrap in the AFC\", assesses the Patriots’ sustained success, and discusses what most impre… https://t.co/ZPpcRurAHZ","created_at":1569972682000,"id":1179177013946527700},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Steve Young discusses what most impresses him about another left-handed QB, Alabama’s Tua Tagovailoa.… https://t.co/WjY9Gj4J3e","created_at":1570012957000,"id":1179345938432831500},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Archie Manning:l believes his grandson, Arch Manning, is 'ahead of' Peyton and Eli at this stage:\n\nhttps://t.co/QNMw434MGM","created_at":1570016278000,"id":1179359866101608400},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @DonnaDitota1: Noah Eagle, at age 22 and newly graduated from Syracuse University, is the new Clippers radio guy. How did that happen?…","created_at":1570023761000,"id":1179391254397935600},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @mortreport: One of our guys! He also can rise above a personal misery as a lifelong (sometimes hopeful) Washington Redskins fan. We lov…","created_at":1570031448000,"id":1179423493777248300},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Chiefs’ WR Tyreek Hill will practice today, per Andy Reid.","created_at":1570035230000,"id":1179439358778249200},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Bengals placed WR John Ross on the Reserve/Injured list and signed WR Stanley Morgan from their practice squad.","created_at":1570037092000,"id":1179447166651306000},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @JordanRaanan: ***Note: Saquon is not coming back this week. His eyes are on next week, although the Giants play at New England on Thurs…","created_at":1570038491000,"id":1179453034063118300},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Cardinals announced the passing of the team’s owner Bill Bidwill. He was 88.","created_at":1570040102000,"id":1179459793846751200},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @AZCardinals: In Remembrance of Mr. B\n\nRead by Larry Fitzgerald https://t.co/YKAO0Awtrp","created_at":1570040642000,"id":1179462058078814200},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Chiefs’ WR Tyreek Hill got a good report on his most recent shoulder checkup, per source. Chiefs want to see how he… https://t.co/bq4Y864NcU","created_at":1570041764000,"id":1179466763920199700},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"RT @john_keim: QB Case Keenum is not going through individual drills. He has a boot on his right foot. Colt McCoy is participating.","created_at":1570042906000,"id":1179471553014227000},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Patriots’ kicker Stephen Gostkowski has a left hip injury that will require season-ending surgery, per source. He i… https://t.co/akN5AprMU3","created_at":1570044854000,"id":1179479725103865900},{"profile_image":"https://pbs.twimg.com/profile_images/793924061843914752/ycm8ibEE_normal.jpg","user":"AdamSchefter","text":"Two kickers vying for Patriots’ job are Kai Forbath and Mike Nugent, per sources.","created_at":1570046956000,"id":1179488541572763600}];
        this.setState(() => (
            {tweets: tweets}
        ));
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <PTRView onRefresh={this.refresh} style={styles.scrollView}>
                    {
                        !this.state.error
                            ? this.renderTweets()
                            : <Text style={styles.errorMessage}>{"ERROR GETTING TWEETS"}</Text>
                    }
                </PTRView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: styleConstants.tweetsColor,
    },
    scrollView: {
        backgroundColor: styleConstants.tweetsColor,
    },
    errorMessage: {
        textAlign: 'center',
        textAlignVertical: "center",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        backgroundColor: 'yellow',
    }
});

export default HomeScreen;
