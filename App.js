import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(parseFloat(selectedNumber))
  }

  return (
    <View style={styles.container}>
      <Header title='Guess A Number' />
      {userNumber ?
        <GameScreen userChoice={userNumber} />
        : <StartGameScreen startGame={startGameHandler} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
