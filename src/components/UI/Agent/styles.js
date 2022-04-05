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
  agentContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '3%',
  },
  agentText: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  agentContactContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: '2%',
  },
  agentContactText: {
    fontSize: 16,
    color: colors.PRIMARY,
  },
  agentAddressContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '3%',
  },
  agentAddressText: {
    fontSize: 16,
    color: colors.BLACK,
    maxWidth: '100%',
  },
});

export default styles;
