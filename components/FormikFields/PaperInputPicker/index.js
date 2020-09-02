import * as React from 'react';
import {
  View,
  Text
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import AutoFill from '../AutoFill';

import getLocation from '../../../modules/geolocation';

const PaperInputPicker = ({ data, formikProps, ...rest }) => {
  const { label, formikKey, fieldType } = data;
  const {
    handleChange, handleBlur, touched, errors, setFieldValue
  } = formikProps;

  const [location, setLocation] = React.useState();

  const handleLocation = async () => {
    const currentLocation = await getLocation();
    const { latitude, longitude } = currentLocation.coords;

    if (formikKey === 'longitude') {
      setLocation(longitude);
      return longitude;
    }

    if (formikKey === 'latitude') {
      setLocation(latitude);
      return latitude;
    }

    return null;
  };

  return (
    <>
      {fieldType === 'input' && (
        <View>
          <TextInput
            label={label}
            onChangeText={handleChange(formikKey)}
            onBlur={handleBlur(formikKey)}
            {...rest} //eslint-disable-line
          />
          <Text style={{ color: 'red' }}>
            {touched[formikKey] && errors[formikKey]}
          </Text>
        </View>
      )}
      {fieldType === 'select' && (
        <View>
          {data.options.map((result) => (
            <Button key={result} mode="contained" onPress={() => setFieldValue(formikKey, result)}>
              <Text>{result}</Text>
            </Button>
          ))}
        </View>
      )}
      {fieldType === 'autofill' && (
        <View>
          <AutoFill
            parameter={data.parameter}
            formikProps={formikProps}
            formikKey={formikKey}
          />
        </View>
      )}
      {fieldType === 'geolocation' && (
        <View>
          <Button mode="contained" onPress={() => setFieldValue(formikKey, handleLocation())}>
            <Text>{location}</Text>
          </Button>
        </View>
      )}
    </>
  );
};

export default PaperInputPicker;
