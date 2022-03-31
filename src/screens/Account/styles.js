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
    width: '60%',
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  followText: {
    fontSize: 16,
  },
  editView: {
    width: '90%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 0.3,
    backgroundColor: 'white',
    opacity: 1,
    elevation: 5,
    shadowOffset: {width: 0, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.7,
    justifyContent: 'center',
  },
  separatorView: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 4,
  },
  subEditView: {
    paddingBottom: '5%',
    paddingHorizontal: '5%',
  },
  textField: {
    width: '90%',
    height: '15%',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 16,
    paddingLeft: 8,
    marginLeft: 20,
  },
  buttonStyle: {
    width: 80,
    height: 25,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    marginLeft: 125,
  },
  crossButton: {
    position: 'absolute',
    right: 3,
    top: 2,
    zIndex: 111,
  },
  crossButtonText: {
    fontWeight: '600',
  },
  updateTitle: {
    fontWeight: '600',
    marginTop: 16,
    marginLeft: 12,
  },
});

export default styles;
