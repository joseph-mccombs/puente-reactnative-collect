// import * as React from 'react';
import React, { useState } from 'react';
import {
  Text, ScrollView, View
} from 'react-native';

import {
  Button
} from 'react-native-paper';

import { layout } from '../../modules/theme';

import Header from '../../components/Header';

import Forms from './Forms';

const DataCollection = ({ navigation }) => {
  const [scrollViewScroll, setScrollViewScroll] = useState();

  const [showForms, setShowForms] = React.useState(false);
  const [selectForm, setSelectForm] = React.useState('id');

  return (
    <View
      style={layout.screenContainer}
      onStartShouldSetResponderCapture={() => {
        setScrollViewScroll(true);
      }}
    >
      <Header />

      <ScrollView keyboardShouldPersistTaps="always" scrollEnabled={scrollViewScroll}>
        {!showForms
          && (
            <View>
              <Text style={layout.line} onPress={() => setShowForms(true)}>New Record</Text>
              <Text style={layout.line}>Find Record</Text>
              <Text style={layout.line}>New Asset</Text>
              <Text style={layout.line}>Find Asset</Text>
            </View>
          )}
        {showForms
          && (
            <View>
              <Button onPress={() => setShowForms(false)}>Back to Data Collection Screen</Button>
              <Forms
                style={layout.line}
                navigation={navigation}
                selectedForm={selectForm}
                setSelectedForm={setSelectForm}
                scrollViewScroll={scrollViewScroll}
                setScrollViewScroll={setScrollViewScroll}
              />
            </View>
          )}
      </ScrollView>
    </View>
  );
};

export default DataCollection;
