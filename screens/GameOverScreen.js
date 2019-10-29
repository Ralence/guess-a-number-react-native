import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import globalStyles from '../constants/globalStyles';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>The Game is Over!</Text>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/success.png')} style={styles.img} />
            </View>
            <Text style={globalStyles.text}>No rounds: {rounds}</Text>
            <Text style={globalStyles.text}>Number was: {userNumber}</Text>
            <Button title='play again' onPress={onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgContainer: {
        width: 300,
        height: 300,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 150,
        marginVertical: 30
    },
    img: {
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;