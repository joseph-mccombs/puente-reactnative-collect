import React from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import {
  Checkbox, Button, Text
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import * as yup from 'yup';
import { retrieveSignUpFunction, retrieveSignInFunction } from '../../../services/parse/auth';

import FormInput from '../../../components/FormikFields/FormInput';
import TermsModal from '../../../components/TermsModal';
// STYLING
import { theme } from '../../../modules/theme';

import I18n from '../../../modules/i18n';

const validationSchema = yup.object().shape({
  firstname: yup
    .string()
    .label('First Name')
    .required(),
  lastname: yup
    .string()
    .label('Last Name')
    .required(),
  email: yup
    .string()
    .label('Email')
    .email(),
  phonenumber: yup
    .string()
    .label('Phone Number')
    .min(10, 'Seems a bit short..'),
  organization: yup
    .string()
    .label('Username')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(4, 'Seems a bit short...'),
  password2: yup
    .string()
    .label('Password')
    .required()
    .min(4, 'Seems a bit short...')
});

// export default () => (
export default function SignUp({ navigation }) {
  const [checked, setChecked] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <ScrollView>
      <SafeAreaView style={{ marginTop: 30 }}>
        <Formik
          initialValues={{
            firstname: '', lastname: '', email: '', phonenumber: '', password: '', password2: '', organization: ''
          }}
          onSubmit={(values, actions) => {
            if (!checked) {
              alert('Error, terms and service need to be agreed to.'); // eslint-disable-line
            } else if (values.password !== values.password2) {
              alert("Error, your passwords do not match.") // eslint-disable-line
            } else {
              retrieveSignUpFunction(values)
                .then((user) => {
                  const userString = JSON.stringify(user);
                  const userValues = JSON.parse(userString);
                  const { username } = userValues;
                  // sign user in after successful sign up
                  retrieveSignInFunction(username, values.password)
                    .then(() => {
                      // user signed in and signed up
                      navigation.navigate('Root');
                    }, () => {
                      // sign in failed, alert user
                    });
                }, () => {
                  // sign up failed alert user
                });
            }
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <>
              <FormInput
                label={I18n.t('signUp.firstName')}
                formikProps={formikProps}
                formikKey="firstname"
                placeholder="John"
                autoFocus
              />
              <FormInput
                label={I18n.t('signUp.lastName')}
                formikProps={formikProps}
                formikKey="lastname"
                placeholder="Doe"
              />
              <FormInput
                label={I18n.t('signUp.email')}
                formikProps={formikProps}
                formikKey="email"
                placeholder="johndoe@example.com"
              />
              <FormInput
                label={I18n.t('signUp.phoneNumber')}
                formikProps={formikProps}
                formikKey="phonenumber"
                placeholder="123-456-7890"
              />
              <FormInput
                label={I18n.t('signUp.password')}
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password Here"
                secureTextEntry
              />
              <FormInput
                label={I18n.t('signUp.password2')}
                formikProps={formikProps}
                formikKey="password2"
                placeholder="Password Here"
                secureTextEntry
              />
              <FormInput
                label={I18n.t('signUp.organization')}
                formikProps={formikProps}
                formikKey="organization"
                placeholder="Puente"
              />
              <Button mode="text" theme={theme} color="#3E81FD" style={styles.serviceButton} onPress={showModal}>{I18n.t('signUp.termsOfService.view')}</Button>
              <View style={styles.container}>
                <Text style={styles.serviceText}>
                  {I18n.t('signUp.termsOfService.acknoledgement')}
                </Text>
                <View style={styles.checkbox}>
                  <Checkbox
                    disabled={false}
                    theme={theme}
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                </View>
              </View>
              {formikProps.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <Button mode="contained" theme={theme} style={styles.submitButton} onPress={formikProps.handleSubmit}>{I18n.t('signUp.submit')}</Button>
              )}

              <TermsModal visible={visible} hideModal={hideModal} />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
  },
  container: {
    flexDirection: 'row',
    marginLeft: 90,
    marginRight: 90,
    marginBottom: 5
  },
  serviceText: {
    flex: 5,
    fontSize: 10
  },
  submitButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 60,
  },
  serviceButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  }
});
