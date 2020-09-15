// Make this render but switch between forms
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';

import { postObjectsToClass } from '../../../../services/parse/crud';

import { layout } from '../../../../modules/theme';

import envArray from './configs/envhealth.config';

import PaperInputPicker from '../../../../components/FormikFields/PaperInputPicker';

const SupplementaryForm = ({ navigation, selectedForm, setSelectedForm }) => {
  const toRoot = () => {
    navigation.navigate('Root');
  };

  const [inputs, setInputs] = useState({});
  const [photoFile, setPhotoFile] = useState('State Photo String');

  useEffect(() => {
    if (selectedForm === 'env') setInputs(envArray);
  }, [selectedForm, envArray]);

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        setPhotoFile('Submitted Photo String');
        const postParams = {
          parseClass: 'SurveyData',
          signature: 'Sample Signature',
          photoFile,
          localObject: values
        };

        postObjectsToClass(postParams)
          .then(() => {
            toRoot(); // This does nothing because we're already at root
            setSelectedForm('');
          }, () => {
          });
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
    // validationSchema={validationSchema}
    >
      {(formikProps) => (
        <View style={layout.formContainer}>
          {inputs.length && inputs.map((result) => (
            <View key={result.formikKey}>
              <PaperInputPicker
                data={result}
                formikProps={formikProps}
              />
            </View>
          ))}

          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button onPress={formikProps.handleSubmit}>
              <Text>Submit</Text>
            </Button>
          )}
        </View>
      )}
    </Formik>
  );
};

export default SupplementaryForm;
