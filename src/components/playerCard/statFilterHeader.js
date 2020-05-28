import React, {useState, useContext} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import Modal from "react-native-modal";
import Button from "../button";
import SeasonFilter from "../filterModals/seasonFilter"
import PositionFilter from "../filterModals/positionFilter"
import {ViewTeamContext} from '../../screens/viewTeam'
import _ from 'lodash';
import StyleConsts from "../../styles/styleConstants";


const StatFilterHeader = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalComponent, setModalComponent] = useState(null);
    const [trendsButtonActive, setTrendsButtonActive] = useState(false);
    const [rankingButtonActive, setRankingButtonActive] = useState(false);
    const [viewTeamState, setViewTeamState] = useContext(ViewTeamContext);


    const weekClick = () => {
        setModalComponent(<SeasonFilter closeModal={() => setModalVisible(false)}/>);
        setModalVisible(true);
    };

    const positionClick = () => {
        if (rankingButtonActive) {
            setRankingButtonActive(false);
            return;
        }

        setModalComponent(<PositionFilter closeModal={() => setModalVisible(false)}/>);
        setModalVisible(true);
        setRankingButtonActive(true);
    };

    const trendsClick = () => {
        if (trendsButtonActive) {
            setTrendsButtonActive(false);
            return;
        }

        setTrendsButtonActive(true);
    };

    const renderWeekLabel = () => {
        if (viewTeamState.week === '0') {
            return 'All Season';
        }

        return `Week ${viewTeamState.week}`
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={modalVisible}
                testID={'modal'}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['left', 'right', 'up', 'down']}
                style={styles.modal}
                propagateSwipe={true}
            >
                {modalComponent}
            </Modal>
            <Button
                onPress={weekClick}
                title={renderWeekLabel()}
                style={styles.activeButton}
            />
            <Button
                onPress={positionClick}
                title={viewTeamState.position === 'all' ? 'Position': viewTeamState.position}
                style={viewTeamState.position === 'all' ? styles.button: styles.activeButton}
            />
            <Button
                onPress={trendsClick}
                title={'Trends'}
                style={trendsButtonActive ? styles.activeButton: styles.button}
            />
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        borderBottomColor: "white",
        borderBottomWidth: .3,
        backgroundColor: "#1b2836",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    button: {
        width: 100,
        borderRadius: 12,
        marginTop: 0,
        marginBottom: 15,
        padding: 10,
    },
    activeButton: {
        width: 100,
        borderRadius: 12,
        marginTop: 0,
        marginBottom: 15,
        padding: 10,
        backgroundColor: 'grey'
    }
});

export default StatFilterHeader;
