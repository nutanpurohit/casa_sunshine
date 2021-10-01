import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: '5%',
    borderStyle: 'solid',
    borderColor: colors.PRIMARY,
    borderWidth: 1,
  },
  amountContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '3%',
  },
  amountText: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  dateContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '3%',
  },
  accountText: {
    fontSize: 20,
    color: colors.PRIMARY,
  },
  descriptionContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '3%',
  },
  descriptionTitleText: {
    fontSize: 20,
    color: colors.PRIMARY,
  },
  descriptionText: {
    fontSize: 18,
    color: colors.BLACK,
  },
  dateText: {
    fontSize: 14,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
});

export default styles;
