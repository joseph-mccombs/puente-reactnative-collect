import React from 'react';
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper';

import IdentificationForm from './IdentificationForm';
import SupplementaryForm from './SupplementaryForm';

import { layout } from '../../../modules/theme';

const Forms = (props) => {
  const {
    navigation, selectedForm, setSelectedForm, scrollViewScroll, setScrollViewScroll
  } = props;
  return (
    <View style={layout.screenContainer}>
      {selectedForm === 'id' && (
        <IdentificationForm
          navigation={navigation}
          scrollViewScroll={scrollViewScroll}
          setScrollViewScroll={setScrollViewScroll}
          setSelectedForm={setSelectedForm}
        />
      )}
      {selectedForm === 'env' && (
        <SupplementaryForm
          navigation={navigation}
          selectedForm={selectedForm}
          setSelectedForm={setSelectedForm}

        />
      )}
      {selectedForm === '' && (
        <View>
          <Text>Suggested next Forms</Text>
          <Card onPress={() => setSelectedForm('id')}>
            <Card.Title title="Resident ID" subtitle="" />
          </Card>
          <Card onPress={() => setSelectedForm('env')}>
            <Card.Title title="Environmental History" subtitle="" />
          </Card>
        </View>
      )}
    </View>
  );
};

export default Forms;
