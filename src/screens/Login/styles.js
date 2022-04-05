import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '20%',
    marginHorizontal: '7%',
    backgroundColor: colors.WHITE,
  },
  logoContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
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
  emailContainer: {
    width: '100%',
    paddingVertical: '5%',
  },
  passwordContainer: {
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
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
  },
  signupContainer: {
    marginVertical: '2%',
    flexDirection: 'row',
  },
  signupText: {
    color: colors.PRIMARY,
    fontSize: 18,
  },
  forgetContainer: {
    marginVertical: '5%',
    flexDirection: 'row',
  },
  forgetText: {
    color: colors.SECONDARY,
    fontSize: 18,
  },
  errorText: {
    fontSize: 14,
    color: colors.RED,
    marginTop: 2,
  },
});

export default styles;
