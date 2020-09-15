import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Formik } from 'formik';
import FormInput from '../../../../components/FormikFields/FormInput';
import { storeData } from '../../../../modules/async-storage';

const StorePinCode = ({ navigation }) => (
  <Formik
    initialValues={{ pincode: '' }}
    onSubmit={(values, actions) => {
      storeData(values.pincode, 'pincode').then(() => {
        navigation.navigate('Root');
      });

      setTimeout(() => {
        actions.setSubmitting(false);
      }, 1000);
    }}
  >
    {(formikProps) => (
      <>
        <FormInput
          label="Enter Pincode to use instead of username/password"
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

export default StorePinCode;
