import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';
// import * as yup from 'yup';

import { postObjectsToClass } from '../../../../services/parse/crud';

import {
  storeData
} from '../../../../modules/async-storage';
import checkOnlineStatus from '../../../../modules/offline';
import generateRandomID from '../../../../modules/utils';
import { layout } from '../../../../modules/theme';

import backgroundPostPatient from './utils';
import configArray from './config/config';

import PaperInputPicker from '../../../../components/FormikFields/PaperInputPicker';

// const validationSchema = yup.object().shape({
//   fname: yup
//     .string()
//     .label('First Name')
//     .required(),
//   lname: yup
//     .string()
//     .label('Last Name')
//     .required()
// });

const IdentificationForm = ({
  navigation, scrollViewScroll, setScrollViewScroll, setSelectedForm
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      backgroundPostPatient();
      toRoot();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [backgroundPostPatient, clearInterval]);

  const toRoot = () => {
    navigation.navigate('Root');
  };

  const [inputs, setInputs] = useState({});
  const [photoFile, setPhotoFile] = useState('State Photo String');

  useEffect(() => {
    setInputs(configArray);
  }, [setInputs, configArray]);

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

        checkOnlineStatus().then((connected) => {
          if (connected) {
            postObjectsToClass(postParams)
              .then(() => {
                toRoot(); // This does nothing because we're already at root
                setSelectedForm('');
              }, () => {
              });
          } else {
            const id = `PatientID-${generateRandomID()}`;
            storeData(postParams, id);
            setSelectedForm('');
          }
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
                scrollViewScroll={scrollViewScroll}
                setScrollViewScroll={setScrollViewScroll}
              // placeholder="Ana"
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

export default IdentificationForm;
