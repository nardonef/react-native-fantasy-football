import React, {useEffect, useState, useContext} from 'react'
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    View,
    Text,
    Button
} from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import _ from 'lodash';
import StyleConstants from '../../styles/styleConstants'
import PlayerInfo from '../playerCard/playerInfo';
import PlayerAttributes from '../playerCard/playerAttributes';
import Modal from 'react-native-modal';
import GraphPicker from './graphPicker';
import PositionStatCategories from '../positionStatCategories'
import {API} from 'aws-amplify';

const PlayerModal = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [graphType, setGraphType] = useState(Object.keys(_.get(PositionStatCategories, props.player.position, {}))[0]);
    const [graphData, setGraphData] = useState([]);

    const playerData = _.cloneDeep(props.player);
    _.unset(playerData, 'fantasyRosterPosition');

    useEffect(() => {
        const apiName = 'team';
        let path = `/team/player/${_.kebabCase(props.player.name)}`;
        API.get(apiName, path)
            .then((response) => {
                console.log(response);
                setGraphData(response.data);
            })
            .catch((e) => {
                console.log(JSON.stringify(e));
            });
    }, []);

    const buildData = (dataSet) => {
        const data = [];
        for (let week=1; week<=17; week++) {
            const weekDataPoint =
                _.get(
                    dataSet[week],
                    `stats.${_.get(PositionStatCategories, `${props.player.position}.${graphType}`)}`,
                    0
                );
            data.push(weekDataPoint);
        }
        return data;
    };

    console.log(playerData)

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <PlayerInfo
                    number={playerData.number}
                    player={playerData}
                    theme={'dark'}
                />
                <PlayerAttributes
                    // age={_.get(playerData, 'stats.player.age')}
                    age={_.get(playerData, 'stats.player.age')}
                    weight={_.get(playerData, 'stats.player.weight')}
                    height={_.get(playerData, 'stats.player.height')}

                />
            </View>
            <View style={styles.centerItems}>
                <Button title={`Weekly ${graphType}`} onPress={() => setModalVisible(true)}/>
                <LineChart
                    data={{
                        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"],
                        datasets: [
                            {
                                data: buildData(graphData)
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width-60} // from react-native
                    height={250}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 10
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    style={{
                        borderRadius: 10,
                    }}
                />
            </View>
            <Button title={'close'} onPress={() => props.closeModal()}/>
            <Modal
                isVisible={modalVisible}
                testID={'modal'}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['left', 'right', 'up', 'down']}
                style={styles.modal}
                propagateSwipe={true}
            >
                <GraphPicker
                    closeModal={() => setModalVisible(false)}
                    setGraph={setGraphType}
                    graph={graphType}
                    options={Object.keys(_.get(PositionStatCategories, props.player.position, {}))}
                />
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 5,
        height: '80%',
        backgroundColor: StyleConstants.tweetsColor,
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    centerItems: {
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    topContainer: {
        flexDirection: 'row'
    }
});

export default PlayerModal;
