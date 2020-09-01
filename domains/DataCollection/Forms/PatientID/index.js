// Make this render but switch between forms
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';
// import * as yup from 'yup';
import { postObjectsToClass } from '../../../../services/parse/crud';
import PaperInputPicker from '../../../../components/PaperInputPicker';
import configArray from './config';

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

const PatientIDForm = ({ navigation }) => {
  const toRoot = () => {
    navigation.navigate('Root');
  };

  // checks whether user is connected to internet, return true if connected, false otherwise
  // maybe on componentDidMount calling this function and then create another function to upload 
  // the objects and delete them afterwards. NEEDs to BE FLESHED OUT
  async function checkOnlineStatus() {
    let status = await Network.getNetworkStateAsync();
    const { isConnected } = status;
    return isConnected;
  }
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs(configArray);
  }, []);

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        const postParams = {
          parseClass: 'SurveyData',
          signature: 'Sample Signature',
          photoFile: 'TestPicture',
          localObject: values
        };

        checkOnlineStatus().then((connected) => {
          if (connected) {
            postObjectsToClass(postParams)
              .then(() => {
                toRoot(); // This does nothing because we're already at root
              }, () => {
              });
          }
          else {
            storeData(postParams, 'PatientIDTest')
          }
        })
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
    // validationSchema={validationSchema}
    >
      {(formikProps) => (
        <>
          {inputs.length && inputs.map((result) => (
            <View key={result.formikKey}>
              <PaperInputPicker
                data={result}
                formikProps={formikProps}
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
        </>
      )}
    </Formik>
  );
};

export default PatientIDForm;
