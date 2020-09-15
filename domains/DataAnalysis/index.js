import * as React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';

import { theme } from '../../modules/theme';


export default function DataAnalysis() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the data analysis page.</Text>
    </View>
  );
}

const { background } = theme.colors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  text: {
    flex: 1,
    color: '#000',
    padding: 10
  }
});
