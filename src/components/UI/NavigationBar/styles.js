import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    paddingVertical: '3%',
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    marginHorizontal: '1%',
  },
  buttonText: {
    fontSize: 16,
    color: colors.WHITE,
  },
});

export default styles;
