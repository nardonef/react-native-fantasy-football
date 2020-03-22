import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import Modal from "react-native-modal";
import Button from "../button";
import SeasonFilter from "./filterModals/seasonFilter"

const StatFilterHeader = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const filterOnClick = () => {
        console.log('clicked')
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Modal
                isVisible={modalVisible}
                testID={'modal'}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}
            >
                <SeasonFilter/>
            </Modal>
            <Button onPress={filterOnClick} title={'Season'} style={styles.button}/>
            <Button onPress={filterOnClick} title={'Total'} style={styles.button}/>
            <Button onPress={filterOnClick} title={'Ranking'} style={styles.button}/>
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
});

export default StatFilterHeader;
