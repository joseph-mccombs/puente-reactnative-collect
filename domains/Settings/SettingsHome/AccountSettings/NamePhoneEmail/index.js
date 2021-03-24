import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button, Headline, IconButton, Text, TextInput } from 'react-native-paper';
import { getData, storeData } from '../../../../../modules/async-storage';
import { theme } from '../../../../../modules/theme'

import { Parse } from 'parse/react-native';
import I18n from '../../../../../modules/i18n';

export default NamePhoneEmail = ({
  settingsView, setSettingsView, accountSettingsView, setAccountSettingsView
}) => {

  useEffect(() => {
    async function setUserInformation() {
      const currentUser = await getData('currentUser');
      console.log(currentUser);
      setObjectId(currentUser['objectId']);
      const fname = currentUser['firstname']
      const lname = currentUser['lastname']
      const phoneNumber = currentUser['phonenumber'];
      const email = currentUser['email'];

      setUserObject({
        firstName: fname,
        lastName: lname,
        phoneNumber: phoneNumber,
        email: email
      })
    }
    setUserInformation().then(() => {
      setInputs([
        {
          label: I18n.t('namePhoneEmailSettings.userInformation.fname'),
          value: userObject.firstName,
          key: 'firstName'
        },
        {
          label: I18n.t('namePhoneEmailSettings.userInformation.lname'),
          value: userObject.lastName,
          key: 'lastName'
        },
        {
          label: I18n.t('namePhoneEmailSettings.userInformation.phoneNumber'),
          value: userObject.phoneNumber,
          key: 'phoneNumber'
        },
        {
          label: I18n.t('namePhoneEmailSettings.userInformation.email'),
          value: userObject.email,
          key: 'email'
        }
      ]);
      setUpdated(false);
    })
  }, [updated])

  const [userObject, setUserObject] = useState({});
  const [edit, setEdit] = useState('');
  const [inputs, setInputs] = useState([]);
  const [objectId, setObjectId] = useState('');
  const [updated, setUpdated] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const updateUserObject = (key, text) => {
    const copyUserObject = userObject;
    copyUserObject[key] = text
    setUserObject(copyUserObject)
  }

  const handleFailedAttempt = () => {
    Alert.alert(
      I18n.t('global.error'),
      I18n.t('namePhoneEmailSettings.errorMessage'), [
      { text: 'OK' }
    ],
      { cancelable: true }
    );
  };

  const handleSucccessfullAttempt = () => {
    Alert.alert(
      I18n.t('global.success'),
      I18n.t('namePhoneEmailSettings.successMessage'), [
      { text: 'OK' }
    ],
      { cancelable: true }
    );
  };

  const updateUser = async () => {
    setSubmitting(true);
    const postParams = {
      'objectId': objectId,
      'firstname': userObject.firstName,
      'lastname': userObject.lastName,
      'email': userObject.email,
      'phonenumber': userObject.phoneNumber
    }
    const credentials = await getData('credentials');

    const user = await Parse.User.logIn(credentials.username, credentials.password);
    for (const key in postParams) {
      user.set(String(key), postParams[key]);
    }

    const submitAction = () => {
      setTimeout(() => {
        setSubmitting(false);
        handleSucccessfullAttempt();
      }, 1000);
    };

    await user.save().then(async (updatedUser) => {
      await storeData(updatedUser, 'currentUser').then(() => {
        setUpdated(true);
        submitAction();
      }, (error) => {
        console.log(error);
        setSubmitting(false);
        handleFailedAttempt();
      })
    }, (error) => {
      console.log(error);
      setSubmitting(false);
      handleFailedAttempt();
    })
  }

  return (
    <View>
      <Headline>{I18n.t('namePhoneEmailSettings.namePhoneEmail')}</Headline>
      <View style={styles.horizontalLinePrimary} />
      {inputs.length > 0 && inputs.map((result) => (
        <View key={result.key}>
          <Text style={styles.text}>{result.label}</Text>
          <View>
            {edit !== result.key && (
              <View style={styles.textContainer}>
                <Text style={styles.text}>{userObject[result.key]}</Text>
                <Button style={{ marginLeft: 'auto' }} onPress={() => {
                  setEdit(result.key)
                }}>Edit</Button>
              </View>
            )}
            {edit === result.key && (
              <View style={styles.textContainer}>
                <TextInput
                  style={{ flex: 3 }}
                  placeholder={result.value}
                  mode='outlined'
                  onChangeText={text => updateUserObject(result.key, text)}
                ></TextInput>
                <View style={styles.buttonContainer}>
                  <IconButton
                    icon='check'
                    size={25}
                    color={theme.colors.primary}
                    style={styles.svg}
                    onPress={() => {
                      setEdit('');
                    }}
                  />
                  <IconButton
                    icon='window-close'
                    size={25}
                    color={theme.colors.primary}
                    style={styles.svg}
                    onPress={() => {
                      setEdit('')
                    }}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.horizontalLineGray} />

        </View>
      ))}
      {submitting ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
        />
      ) : (
          <Button onPress={() => updateUser()}>Submit</Button>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  textContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1
  },
  svg: {
    marginLeft: 'auto',
    marginTop: -3,
    marginBottom: -5
  },
  text: {
    flexShrink: 1,
    // fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginVertical: 7,
  },
  horizontalLineGray: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalLinePrimary: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  }
});