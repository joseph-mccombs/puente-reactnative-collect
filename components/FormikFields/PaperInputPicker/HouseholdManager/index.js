import React, { useState } from 'react';
import {
  View, Modal
} from 'react-native';
import {
  Button, RadioButton, Appbar
} from 'react-native-paper';

import ResidentIdSearchbar from '../../../ResidentIdSearchbar';

import { theme, layout } from '../../../../modules/theme';

import { postObjectsToClass } from '../../../../services/parse/crud';

import styles from './index.style';

// const relationships = [
//   'Parent', 'Sibling', 'Grand-Parent', 'Cousin', 'Other'
// ];

const HouseholdManager = (props) => {
  const { formikProps, formikKey, surveyingOrganization } = props;
  const { setFieldValue } = formikProps;

  const [selectPerson, setSelectPerson] = useState();
  // const [, setHouseholdRelationship] = useState();
  const [modalView, setModalView] = useState('zero');

  const onSubmit = () => {
    setModalView('third');
    attachToExistingHousehold();
  };

  const attachToExistingHousehold = () => {
    // set householdId (from selectPerson) on the residentIdForm
    setFieldValue(formikKey, selectPerson.householdId || 'No Household Id Found');
  };

  const createNewHousehold = () => {
    // create new householdId and attach on the residentIdForm
    const postParams = {
      parseClass: 'Household',
      localObject: {
        latitude: 0,
        longitude: 0
      }
    };
    postObjectsToClass(postParams).then((result) => {
      setFieldValue(formikKey, result.id);
    });
  };

  return (
    <View style={layout.formContainer}>
      {modalView !== 'second' && modalView !== 'third'
        && (
          <View>
            <RadioButton.Group onValueChange={(value) => setModalView(value)} value={modalView}>
              <RadioButton.Item label="Do Nothing" value="zero" />
              <RadioButton.Item label="Create a new household" value="first" />
              {modalView === 'first'
                && <Button style={layout.buttonGroupButtonStyle} icon="plus" mode="contained" onPress={createNewHousehold}>Household</Button>}
              <RadioButton.Item label="Link this individual to an existing house" value="second" />
            </RadioButton.Group>
          </View>
        )}

      {
        modalView === 'second'
        && (
          <Modal
            animationType="slide"
            visible
          >
            <Appbar.Header>
              <Appbar.BackAction onPress={() => setModalView('first')} />
              <Appbar.Content title="Household Manager" subtitle="" />
            </Appbar.Header>

            <View style={styles.container}>
              <ResidentIdSearchbar
                surveyee={selectPerson}
                setSurveyee={setSelectPerson}
                surveyingOrganization={surveyingOrganization}
              />
              {/* <Text>What is their role/relationship in the household?</Text>
<View style={layout.buttonGroupContainer}>
{relationships.map((result) => (
<Button
  style={layout.buttonGroupButtonStyle}
  key={result} mode="outlined" onPress={() => setHouseholdRelationship(result)}>
<Text>{result}</Text>
</Button>
))}
            </View> */}
              <Button theme={{ backgroundColor: theme.colors.primary }} style={layout.buttonGroupButtonStyle} mode="contained" onPress={onSubmit}>
                Submit
              </Button>
            </View>
          </Modal>
        )
      }
      {modalView === 'third'
        && (
          <View>
            <RadioButton.Group onValueChange={(value) => setModalView(value)} value={modalView}>
              <RadioButton.Item label="Linked" value="third" />
            </RadioButton.Group>
          </View>
        )}
    </View>
  );
};

export default HouseholdManager;
