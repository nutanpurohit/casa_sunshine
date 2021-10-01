import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: '3%',
  },
  paymentContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '3%',
  },
  moreInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '3%',
  },
  titleText: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  paymentText: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreInfoText: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default styles;
