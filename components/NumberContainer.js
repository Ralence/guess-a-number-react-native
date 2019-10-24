import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NumberContainer = props => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            <Text>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 5
    }
});

export default NumberContainer;