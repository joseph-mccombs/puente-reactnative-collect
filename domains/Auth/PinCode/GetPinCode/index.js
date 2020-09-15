import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';
import FormInput from '../../../../components/FormikFields/FormInput';
import { getData, deleteData } from '../../../../modules/async-storage';
import { retrieveSignInFunction } from '../../../../services/parse/auth';

const GetPinCode = ({ navigation }) => {
  const [failedAttempts, setFailedAttempts] = useState(1);

  return (
    <Formik
      initialValues={{ pincode: '' }}
      onSubmit={(values, actions) => {
        getData('pincode').then((pincode) => {
          if (values.pincode === pincode) {
            // IF ONLINE, otherwise just log in
            getData('credentials')
              .then((userCreds) => {
                retrieveSignInFunction(userCreds.username, userCreds.password);
                navigation.navigate('Root');
              }, () => {
                // error with stored credentials
              });
          } else {
            setFailedAttempts(failedAttempts + 1);
            // go back to sign in on 3rd attempt
            if (failedAttempts >= 3) {
              deleteData('credentials');
              deleteData('pincode');
              navigation.navigate('Sign In');
            } else if (failedAttempts === 2) {
              alert('Incorrect pincode, please try again. ' // eslint-disable-line
                + 'This is your last chance to enter your pincode,'
                + 'your credentials will be reset and pincode will be'
                + ' deleted on another failed attempt.');
            } else {
              alert('Incorrect pincode, please try again.'); // eslint-disable-line
            }
          }
        });

        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {(formikProps) => (
        <>
          <FormInput
            label="Enter Pincode"
            formikProps={formikProps}
            formikKey="pincode"
            placeholder="123456"
            keyboardType="numeric"
          />
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

export default GetPinCode;
