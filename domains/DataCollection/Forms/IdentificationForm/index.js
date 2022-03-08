import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,View,
} from 'react-native';

import PaperInputPicker from '../../../../components/FormikFields/PaperInputPicker';
import yupValidationPicker from '../../../../components/FormikFields/YupValidation';
import { layout, theme } from '../../../../modules/theme';
import configArray from './config/config';

const IdentificationForm = ({
  scrollViewScroll, setScrollViewScroll,
  setSelectedForm
}) => {
  useEffect(() => {
    setValidationSchema(yupValidationPicker(configArray));
  }, []);

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
