import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {widthPercentageToDP as wp} from '../../../config/ResponsiveScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: '20%',
    marginHorizontal: '7%',
    backgroundColor: colors.WHITE,
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
});

export default styles;
