import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './Game';


export default function App() {
  return (
    <View style={styles.container}>
      <Game/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
