import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors'

const MyButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    btnText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default MyButton;