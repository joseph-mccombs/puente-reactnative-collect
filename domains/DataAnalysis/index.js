import * as React from 'react';
import {
  Text, View
} from 'react-native';

import { layout } from '../../modules/theme';

import Header from '../../components/Header';

export default function DataAnalysis() {
  return (
    <View style={layout.screenContainer}>
      <Header />
      <Text>Welcome to the data analysis page.</Text>
    </View>
  );
}
