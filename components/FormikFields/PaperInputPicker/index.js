import * as React from 'react';
import {
  View, Text
} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';

import AutoFill from '../AutoFill';

import getLocation from '../../../modules/geolocation';
import { theme } from '../../../modules/theme';
import UseCamera from '../../Multimedia/Photo';

const PaperInputPicker = ({
  data, formikProps, scrollViewScroll, setScrollViewScroll, ...rest
}) => {
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
            mode="outlined"
            theme={{ colors: { placeholder: theme.colors.primary }, text: 'black' }}
          />
          <Text style={{ color: 'red' }}>
            {touched[formikKey] && errors[formikKey]}
          </Text>
        </View>
      )}
      {fieldType === 'select' && (
        <View>
          <Title>{label}</Title>
          {data.options.map((result) => (
            <Button key={result} mode="outlined" onPress={() => setFieldValue(formikKey, result)}>
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
            scrollViewScroll={scrollViewScroll}
            setScrollViewScroll={setScrollViewScroll}
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
      {fieldType === 'photo' && (
        <View>
          <UseCamera
            formikProps={formikProps}
            formikKey={formikKey}
          />
        </View>
      )}
    </>
  );
};

export default PaperInputPicker;
