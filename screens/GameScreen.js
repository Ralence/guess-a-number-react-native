import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import globalStyles from '../constants/globalStyles';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    if (randomNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [round, setRound] = useState(1);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        setRound(prevState => prevState + 1)
        if (currentGuess === props.userChoice) {
            props.onGameOver(round)
        }
    }, [currentGuess])

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert(`Don't mislead!`, `Give honest answers!!!`, [
                { text: 'Sorry', style: 'cancel' }
            ]);
            return;
        } else if (direction === 'greater') {
            currentLow.current = currentGuess + 1;
        } else {
            currentHigh.current = currentGuess - 1;
        }
        setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current))
    }

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <Button title='LOWER' onPress={() => nextGuessHandler('lower')} />
                <Button title='GREATER' onPress={() => nextGuessHandler('greater')} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;