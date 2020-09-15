/* eslint no-param-reassign: ["error",
{ "props": true, "ignorePropertyModificationsFor": ["formikProps"] }] */
import React, {
  useState, useEffect
} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import {
  Checkbox, Button,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Network from 'expo-network';
import { retrieveSignInFunction } from '../../../services/parse/auth';
import FormInput from '../../../components/FormikFields/FormInput';
import LanguagePicker from '../../../components/LanguagePicker';
import CredentialsModal from './CredentialsModal';
import { storeData, getData, deleteData } from '../../../modules/async-storage';

import I18n from '../../../modules/i18n';

// STYLING
import { theme } from '../../../modules/theme';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(4, 'Seems a bit short...')
});

const SignIn = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');

  const load = false;

  useEffect(() => {
    getData('credentials').then((values) => {
      setUser(values);
      if (values != null) {
        setModalVisible(true);
      }
    });
  }, [load]);

  const handleSignUp = () => {
    navigation.navigate('Sign Up');
  };

  const handleSaveCredentials = (values) => {
    Alert.alert(
      'Credentials',
      'Would you like to save your login credentials for future use?',
      [
        {
          text: 'Yes',
          onPress: () => {
            storeData(values, 'credentials');
            navigation.navigate('StorePincode');
          }
        },
        { text: 'No', style: 'cancel' },
      ],
      { cancelable: false }
      // clicking out side of alert will not cancel
    );
  };

  const handleLanguage = (lang) => {
    setLanguage({
      lang
    });
    I18n.locale = lang;
  };

  // checks whether user is connected to internet, return true if connected, false otherwise
  async function checkOnlineStatus() {
    const status = await Network.getNetworkStateAsync();
    const { isConnected } = status;
    return isConnected;
  }
  const deleteCreds = () => {
    deleteData('credentials');
  };

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <LanguagePicker language={language} onChangeLanguage={handleLanguage} />
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values, actions) => {
          checkOnlineStatus().then((connected) => {
            if (connected) {
              retrieveSignInFunction(values.username, values.password)
                .then(() => {
                  getData('credentials')
                    .then((userCreds) => {
                      // credentials saved do not match those entered, overwrite saved credentials
                      if (userCreds === null || values.username !== userCreds.username
                        || values.password !== userCreds.password) {
                        handleSaveCredentials(values);
                      }
                    }, () => {
                      // no credentials saved, give option to save
                      handleSaveCredentials(values);
                    });
                  navigation.navigate('Root');
                }, (error) => {
                  // eslint-disable-next-line
                  console.log(error)
                });
            } else {
              // offline
              getData('credentials')
                .then((userCreds) => {
                  // username and password entered (or saved in creds) match the saved cred
                  if (values.username === userCreds.username
                    && values.password === userCreds.password) {
                    // need some pincode verification
                    navigation.navigate('Root');
                  } else {
                    // cannot log in offline without saved credentials, must connect to internet
                  }
                });
            }
          });
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <>
            <FormInput
              label={I18n.t('signIn.username')}
              formikProps={formikProps}
              formikKey="username"
              placeholder="johndoe@example.com"
              autoFocus
            />
            {!checked ? (
              <FormInput
                label={I18n.t('signIn.password')}
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password here"
                secureTextEntry
              />
            ) : (
              <FormInput
                label={I18n.t('signIn.password')}
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password here"
              />
            )}
            <View style={styles.container}>
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
              <Text style={styles.passwordText}>{I18n.t('signIn.showPassword')}</Text>
            </View>
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button mode="contained" theme={theme} style={styles.submitButton} onPress={formikProps.handleSubmit}>{I18n.t('signIn.submit')}</Button>
            )}
            <Button mode="text" theme={theme} color="#3E81FD" onPress={handleSignUp}>
              {I18n.t('signIn.signUpLink')}
            </Button>
            <CredentialsModal
              modalVisible={modalVisible}
              formikProps={formikProps}
              user={user}
              setModalVisible={setModalVisible}
              navigation={navigation}
            />
          </>
        )}
      </Formik>
      <Button onPress={deleteCreds}>Delete Credentials</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    flexDirection: 'row'
  },
  passwordText: {
    flex: 10,
    fontSize: 15,
    marginLeft: 10
  },
  checkbox: {
    flex: 1,
    borderRadius: 5,
    marginLeft: 20,
    backgroundColor: 'white'
  },
  submitButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    marginBottom: 10,
  },
});

export default SignIn;
