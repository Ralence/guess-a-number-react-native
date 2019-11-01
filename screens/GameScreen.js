import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import globalStyles from '../constants/globalStyles';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
import GlobalStyles from '../constants/globalStyles';

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

const renderListItem = (item, numberOfRounds) => {
    return (
        <View style={styles.listItem} key={item}>
            <Text style={globalStyles.text}>#{numberOfRounds}</Text>
            <Text style={globalStyles.text}>{item}</Text>
        </View>
    )
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
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((item, index) => renderListItem(item, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    contentContainerStyle={styles.list}
                    data={pastGuesses.map((item, index) => ({ round: item + '', key: item + '', index }))}
                    renderItem={({ item }) => renderListItem(item.round, pastGuesses.length - item.index)}

                />
            </View>
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
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    list: {
        flexGrow: 1,
        //alignItems: 'center',
        //justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default GameScreen;