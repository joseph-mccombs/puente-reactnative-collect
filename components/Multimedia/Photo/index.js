import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';

export default function UseCamera({ formikProps, formikKey }) {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  let camera = useRef(null);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImage(photo.uri);
      formikProps.setFieldValue(formikKey, photo.uri);
    }
  };

  const resetPicture = () => {
    setImage(null);
    formikProps.setFieldValue(formikKey, null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 3, padding: 16, }}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <Button onPress={resetPicture}>Retake Picture</Button>
        </>
      ) : (
        <>
          <Camera
            style={{ flex: 3 }}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}
            autofocus
            zoom={zoom}
          >
            <View
              style={styles.cameraButtonContainer}
            >
              <TouchableOpacity
                style={styles.flipContainer}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.cameraButtonText}> Flip </Text>
              </TouchableOpacity>
              <View style={styles.cameraButtonContainer}>
                <View style={styles.zoomContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setZoom(
                        zoom === 0.4
                          ? zoom
                          : zoom + 0.1
                      );
                    }}
                  >
                    <Text style={styles.cameraButtonText}> + </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setZoom(
                        zoom === 0
                          ? zoom
                          : zoom - 0.1
                      );
                    }}
                  >
                    <Text style={styles.cameraButtonText}> - </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
          <Button onPress={takePicture}>Take Picture</Button>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipContainer: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  zoomContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end'
  },
  cameraButtonText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    marginRight: 10
  }
});
