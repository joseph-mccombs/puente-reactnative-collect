import * as React from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// started this, it is not complete but it is in a working state
export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    cameraPermission: ''
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  // componentDidMount() {
  //   this.getPermissionAsync();
  // }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { permission } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ 'cameraPermission': permission })
      console.log(this.state)
      if (this.state.cameraPermission !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}
