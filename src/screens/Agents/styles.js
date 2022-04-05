import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAgentButton: {
    position: 'absolute',
    borderRadius: 30,
    padding: 10,
    right: wp('5'),
    bottom: hp('2'),
    backgroundColor: colors.PRIMARY,
  },
});

export default styles;
