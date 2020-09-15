import {
  StyleSheet
} from 'react-native';

const layout = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  line: {
    flex: 0.5,
    padding: 10,
  },
  screenRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
});

export default layout;
