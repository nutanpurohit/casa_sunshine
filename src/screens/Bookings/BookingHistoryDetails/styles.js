import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  cardContainer: {
    width: '90%',
    marginVertical: '5%',
  },
  bookingHistoryContainer: {
    flexDirection: 'row',
    padding: '3%',
    backgroundColor: colors.PRIMARY,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  bookingHistoryText: {
    fontSize: 16,
    color: colors.WHITE,
    marginRight: 5,
  },
  viewTransactionsButton: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    width: '90%',
  },
  bottomButton: {
    width: '45%',
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: '3%',
    flexDirection: 'row',
  },
});

export default styles;
