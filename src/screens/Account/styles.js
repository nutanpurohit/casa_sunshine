import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  profileContainer: {
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  listContainer: {
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  followContainer: {
    width: '40%',
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followText: {
    fontSize: 16,
  },
});

export default styles;
