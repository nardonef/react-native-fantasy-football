import React, {useState} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import PropTypes from 'prop-types';

const FilterOption = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const filterOnClick = () => {
        console.log('clicked')
        setModalVisible(true);
    };

    const radio_props = [
        {label: '', value: 0 }
    ];



    return (
        <View style={styles.container}>
            <Text>{props.text}</Text>
            <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={props.handleSelect}
            />
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight:10,
        borderBottomColor: "black",
        borderBottomWidth: .3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

FilterOption.propTypes = {
    text: PropTypes.string,
    handleSelect: PropTypes.func
};

export default FilterOption;
