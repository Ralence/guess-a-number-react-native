import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title='Guess A Number' />
      <Text>hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
