import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  modalContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    height: '60%',
    width: '90%',
    borderRadius: 10,
  },
  applyFilterButton: {
    flexDirection: 'row',
    marginBottom: '2%',
    padding: '3%',
    backgroundColor: colors.PRIMARY,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  applyFilterButtonText: {
    fontSize: 16,
    color: colors.WHITE,
    marginRight: 5,
  },
  modalButton: {
    flexDirection: 'row',
    marginBottom: '2%',
    padding: '3%',
    backgroundColor: colors.PRIMARY,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default styles;
