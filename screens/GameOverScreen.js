import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import globalStyles from '../constants/globalStyles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = ({ rounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>The Game is Over!</Text>
            <View style={styles.imgContainer}>
                <Image source={require('../assets/success.png')} style={styles.img} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text></Text>
            </View>
            <MainButton onPress={onRestart} >PLAY AGAIN</MainButton>
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
    },
    textContainer: {
        marginHorizontal: 30,
        marginVertical: 15,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    }
});

export default GameOverScreen;