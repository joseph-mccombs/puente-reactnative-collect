import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Modal, Text, Portal, Headline, Button
} from 'react-native-paper';

// STYLING
import { theme } from '../../modules/theme';

export default function TermsModal(props) {
  const { visible, hideModal } = props;
  return (
    <Portal theme={theme}>
      <Modal
        visible={visible}
        theme={theme}
        contentContainerStyle={styles.modal}
        dismissable={false}
      >
        <Headline theme={theme}>Terms and Service</Headline>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Button mode="contained" theme={theme} color="#3E81FD" style={styles.button} onPress={hideModal}>Ok</Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 30,
    margin: 30
  },
  button: {
    marginTop: 30
  }
});
