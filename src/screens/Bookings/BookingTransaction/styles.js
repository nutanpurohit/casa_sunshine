import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  addBookingButton: {
    position: 'absolute',
    borderRadius: 30,
    padding: 10,
    right: wp('5'),
    bottom: hp('3'),
    backgroundColor: colors.PRIMARY,
  },
});

export default styles;
