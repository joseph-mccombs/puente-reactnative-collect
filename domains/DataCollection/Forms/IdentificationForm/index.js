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
  scrollViewScroll, setScrollViewScroll, setSelectedForm
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      backgroundPostPatient();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [clearInterval]);

  const [inputs, setInputs] = useState({});
  const [camera, setCamera] = React.useState(false);

  useEffect(() => {
    setInputs(configArray);
  }, [setInputs, configArray]);

  return (
    <View>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          const submitAction = () => {
            setTimeout(() => {
              setSelectedForm('');
              actions.setSubmitting(false);
            }, 1000);
          };

          const { photo } = values;
          delete values.photo; // eslint-disable-line
          const postParams = {
            parseClass: 'SurveyData',
            signature: 'Sample Signature',
            photoFile: photo,
            localObject: values
          };

          checkOnlineStatus().then((connected) => {
            if (connected) {
              postObjectsToClass(postParams).then(() => {
                submitAction();
              });
            } else {
              const id = `PatientID-${generateRandomID()}`;
              storeData(postParams, id);
              submitAction();
            }
          });
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
                  camera={camera}
                  setCamera={setCamera}
                  values={formikProps.values}
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
    </View>
  );
};

export default IdentificationForm;
