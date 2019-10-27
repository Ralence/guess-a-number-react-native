import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(false);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setLoading(false)}
      onError={(err) => console.log(err)} />
  }

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
