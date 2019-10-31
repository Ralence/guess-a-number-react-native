import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import globalStyles from '../constants/globalStyles';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

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
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
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
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current)
        setCurrentGuess(nextNumber);

        setPastGuesses(prevState => [nextNumber, ...prevState]);
    }

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.btnContainer}>
                <MainButton style={{ backgroundColor: Colors.secondary }} onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <ScrollView>
                {pastGuesses.map(item => <View key={item}><Text>{item}</Text></View>)}
            </ScrollView>
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