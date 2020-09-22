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
  data, formikProps, scrollViewScroll, setScrollViewScroll, camera, setCamera, values, ...rest
}) => {
  const { label, formikKey, fieldType } = data;
  const {
    handleChange, handleBlur, touched, errors, setFieldValue
  } = formikProps;

  const [location, setLocation] = React.useState();
  const [valuesBeforeCamera, setValuesBeforeCamera] = React.useState();

  React.useEffect(() => {
    console.log(values);
    setValuesBeforeCamera(values);
  });

  const changeToCamera = () => {
    setCamera(true);
  };

  const handleLocation = async () => {
    const currentLocation = await getLocation();
    const { latitude, longitude } = currentLocation.coords;

    if (formikKey === 'longitude') {
      setLocation(longitude);
      setFieldValue(formikKey, longitude);
      return longitude;
    }

    if (formikKey === 'latitude') {
      setLocation(latitude);
      setFieldValue(formikKey, latitude);
      return latitude;
    }

    return null;
  };

  return (
    <>
      {/* fields only show when the camera is not open, if values have been defined prior to using the camera
    the values NEED to be passed to the TextInput, Autofilll, --** SELECT AND GEOLAOCATION NEED TO BE FIGURED OUT -- ** */}
      {fieldType === 'input' && camera === false && (
        <View>
          {valuesBeforeCamera && valuesBeforeCamera[formikKey] ? (
            <View>
              <TextInput
                label={label}
                onChangeText={handleChange(formikKey)}
                onBlur={handleBlur(formikKey)}
                value={valuesBeforeCamera[formikKey]}
                {...rest} //eslint-disable-line
                mode="outlined"
                theme={{ colors: { placeholder: theme.colors.primary }, text: 'black' }}
              />
              <Text style={{ color: 'red' }}>
                {touched[formikKey] && errors[formikKey]}
              </Text>
            </View>
          ) : (
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
        </View>
      )}
      {fieldType === 'select' && camera === false && (
        <View>
          {valuesBeforeCamera && valuesBeforeCamera[formikKey] ? (
            <View>
              <Title>{label}</Title>
              {data.options.map((result) => (
                <Button key={result} mode="outlined" onPress={() => setFieldValue(formikKey, result)}>
                  <Text>{result}</Text>
                </Button>
              ))}
            </View>
          ) : (
            <View>
              <Title>{label}</Title>
              {data.options.map((result) => (
                <Button key={result} mode="outlined" onPress={() => setFieldValue(formikKey, result)}>
                  <Text>{result}</Text>
                </Button>
              ))}
            </View>
          )}
        </View>
      )}
      {fieldType === 'autofill' && camera === false && (
        <View>
          {valuesBeforeCamera && valuesBeforeCamera[formikKey] ? (
            <AutoFill
              parameter={data.parameter}
              formikProps={formikProps}
              formikKey={formikKey}
              scrollViewScroll={scrollViewScroll}
              setScrollViewScroll={setScrollViewScroll}
              cameraValue={valuesBeforeCamera[formikKey]}
            />
          ) : (
            <AutoFill
              parameter={data.parameter}
              formikProps={formikProps}
              formikKey={formikKey}
              scrollViewScroll={scrollViewScroll}
              setScrollViewScroll={setScrollViewScroll}
            />
          )}
        </View>
      )}
      {fieldType === 'geolocation' && camera === false && (
        <View>
          {valuesBeforeCamera && valuesBeforeCamera[formikKey] ? (
            <Button mode="contained" onPress={() => handleLocation()}>
              <Text>{location}</Text>
            </Button>
          ) : (
            <Button mode="contained" onPress={() => handleLocation()}>
              <Text>{location}</Text>
            </Button>
          )}
        </View>
      )}
      {fieldType === 'photo' && (
        <View>
          {camera ? (
            <UseCamera
              formikProps={formikProps}
              formikKey={formikKey}
              setCamera={setCamera}
            />
          ) : (
            <Button mode="outlined" onPress={() => changeToCamera()}>Take Photo</Button>
          )}
        </View>
      )}
    </>
  );
};

export default PaperInputPicker;
