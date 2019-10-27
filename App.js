import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(false);

  const startGameHandler = (selectedNumber) => {
    setUserNumber(parseFloat(selectedNumber));
    setGuessRounds(0);
  };

  const gameOverHandler = num => {
    setGuessRounds(num);
  };

  const restartHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  let appScreen = <StartGameScreen startGame={startGameHandler} />
  if (userNumber && guessRounds <= 0) {
    appScreen = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }
  if (guessRounds > 0) {
    appScreen = <GameOverScreen rounds={guessRounds} userNumber={userNumber} onRestart={restartHandler} />
  }

  return (
    <View style={styles.container}>
      <Header title='Guess A Number' />
      {appScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
