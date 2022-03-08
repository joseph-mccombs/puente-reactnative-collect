import * as React from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  Button,
  TextInput,
} from 'react-native-paper';

import getLocation from '../../../modules/geolocation';
import { theme } from '../../../modules/theme';
import UseCamera from '../../Multimedia/Photo';

const PaperInputPicker = ({
  data, formikProps, scrollViewScroll, setScrollViewScroll, camera, setCamera, values, ...rest
}) => {
  const {
    label, formikKey, fieldType, sideLabel
  } = data;

  const {
    handleChange, handleBlur, errors, setFieldValue, values
  } = formikProps;

  const [location, setLocation] = React.useState();
  const [valuesBeforeCamera, setValuesBeforeCamera] = React.useState();

  React.useEffect(() => {
    setValuesBeforeCamera(values);
  });

  const changeToCamera = () => {
    setCamera(true);
  };

  const handleLocation = async () => {
    setLocationLoading(true);
    const currentLocation = await getLocation().catch((e) => e);
    const { latitude, longitude, altitude } = currentLocation.coords;

    setFieldValue('location', { latitude, longitude, altitude });
    setLocation({ latitude, longitude, altitude });
    setTimeout(() => {
      setLocationLoading(false);
    }, 1000);
  };

  const translatedLabel = customForm ? label : I18n.t(label);
  const translatedLabelSide = customForm ? sideLabel : I18n.t(sideLabel);

  const addArrayVal = (result) => {
    if (values[formikKey] || values[formikKey] === []) {
      setFieldValue(formikKey, values[formikKey].concat([result.value]));
    } else {
      setFieldValue(formikKey, [result.value]);
    }
  };

  return (
    <>
      {/* fields only show when the camera is not open, if values have been
      defined prior to using the camera the values NEED to be passed to the
      TextInput, Autofilll, --** SELECT AND GEOLAOCATION NEED TO BE FIGURED OUT
      -- ** */}
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
      {
        fieldType === 'multiInputRowNum' && (
          <View style={stylesDefault.container}>
            <Text style={stylesDefault.label}>{translatedLabel}</Text>
            <View style={stylesDefault.multiInputContainer}>
              {data.options.map((result) => (result.textSplit ? (
                <View key={`${result}`} style={{ flex: 1 }}>
                  <Text style={styleX.textSplit}>{result.label}</Text>
                </View>
              ) : (
                <View key={result.value} style={stylesDefault.inputItem}>
                  <TextInput
                    label={customForm ? result.label : I18n.t(result.label)}
                    onChangeText={handleChange(result.value)}
                    onBlur={handleBlur(result.value)}
                      {...rest} //eslint-disable-line
                    mode="outlined"
                    keyboardType="numeric"
                    maxLength={result.maxLength ? result.maxLength : null}
                    theme={{ colors: { placeholder: theme.colors.primary }, text: 'black' }}
                  />
                  <Text style={{ color: 'red' }}>
                    {errors[result.value]}
                  </Text>
                </View>
              )))}
            </View>
          </View>
        )
      }
    </>
  );
};

export default PaperInputPicker;
