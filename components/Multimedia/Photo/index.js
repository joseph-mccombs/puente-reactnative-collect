import React, { useState, useEffect, useRef } from 'react';
import {
  Text, View, TouchableOpacity, Image, StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';
import { Camera } from 'expo-camera';

export default function UseCamera({ formikProps, formikKey, setCamera }) {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [zoom, setZoom] = useState(0);
  let camera = useRef(null);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({ base64: true });
      // uri is used to view the photo in the app, base64 used to save in parse
      setImage(photo.uri);
      formikProps.setFieldValue(formikKey, photo.base64);
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
        <View style={{ flex: 3, padding: 15 }}>
          <Image source={{ uri: image }} style={{ width: 315, height: 400 }} />
          <Button onPress={resetPicture}>Retake Picture</Button>
          <Button onPress={() => setCamera(false)}>Use Picture</Button>
        </View>
      ) : (
        <>
          <Camera
            style={{ flex: 3, height: 400 }}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}
            base64
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
