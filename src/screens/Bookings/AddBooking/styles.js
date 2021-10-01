import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: '20%',
    marginHorizontal: '7%',
    backgroundColor: colors.WHITE,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.PRIMARY,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '10%',
    width: '100%',
  },
  nameContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  textInput: {
    width: '100%',
  },
  buttonContainer: {
    marginVertical: '5%',
    backgroundColor: colors.PRIMARY,
    width: '100%',
    // height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('2'),
    borderRadius: 7,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
  },
  phoneNumberContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  emailContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  totalAmountContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  depositContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  numberGuestContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  guestTextInput: {
    width: '45%',
  },
  specialInstructionsContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  typeContainer: {
    width: '100%',
    // paddingVertical: '5%',
  },
  picker: {},
  dateTextInput: {
    borderRadius: 5,
    height: hp('7'),
    borderColor: colors.PRIMARY,
  },
  dateContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3%',
    flexDirection: 'row',
    width: '100%',
  },
  datePickerButton: {
    width: '45%',
  },
});

export default styles;
