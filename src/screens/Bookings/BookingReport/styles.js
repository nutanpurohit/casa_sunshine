import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default styles;
